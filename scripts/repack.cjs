const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const MODELS_DIR = path.join(__dirname, '../public/models');
const ATLAS_PATH = path.join(MODELS_DIR, 'atlas.json');

const atlas = JSON.parse(fs.readFileSync(ATLAS_PATH, 'utf-8'));

// 1. Read all original chunks into memory
const oldChunks = [];
for (let i = 0; i < atlas.chunks.length; i++) {
  const buf = fs.readFileSync(path.join(MODELS_DIR, `body-${i}.bin`));
  oldChunks.push(buf);
}

// 2. Separate parts into Priority and Lazy
const priorityParts = [];
const lazyParts = [];
for (const p of atlas.parts) {
  if (p.system === 'skeletal' || p.system === 'muscular') {
    priorityParts.push(p);
  } else {
    lazyParts.push(p);
  }
}

const allOrderedParts = [...priorityParts, ...lazyParts];

const MAX_CHUNK_SIZE = 4 * 1024 * 1024; // 4MB

const newChunks = []; // Array of buffers
const newChunkMetadata = []; // Array of objects
let currentChunkBuffer = Buffer.alloc(MAX_CHUNK_SIZE * 2); // Over-allocate to prevent overflow
let currentChunkOffset = 0;
let currentChunkIndex = 0;

function flushChunk() {
  if (currentChunkOffset > 0) {
    const finalBuffer = currentChunkBuffer.slice(0, currentChunkOffset);
    newChunks.push(finalBuffer);
    
    // Create gzip
    const gzipped = zlib.gzipSync(finalBuffer, { level: 9 });
    
    newChunkMetadata.push({
      url: `/models/body-${currentChunkIndex}.bin`,
      bytes: finalBuffer.length,
      gzip: `/models/body-${currentChunkIndex}.bin.gz`,
      gzipBytes: gzipped.length
    });
    
    currentChunkIndex++;
    currentChunkBuffer = Buffer.alloc(MAX_CHUNK_SIZE * 2);
    currentChunkOffset = 0;
  }
}

for (const p of allOrderedParts) {
  const posBytes = p.vertexCount * 3 * 4;
  const normBytes = p.vertexCount * 3 * 2;
  const indicesBytes = p.indexCount * 4;
  
  // Calculate total bytes this part will take (including padding)
  let nextOffset = currentChunkOffset;
  nextOffset += posBytes;
  const normOffset = nextOffset;
  nextOffset += normBytes;
  
  // Pad for indices (must be 4-byte aligned)
  const indicesOffset = Math.ceil(nextOffset / 4) * 4;
  const partTotalBytes = indicesOffset + indicesBytes - currentChunkOffset;
  
  if (currentChunkOffset + partTotalBytes > MAX_CHUNK_SIZE && currentChunkOffset > 0) {
    flushChunk();
  }
  
  // Copy data
  const sourceBuffer = oldChunks[p.chunk];
  
  // 1. Copy positions
  sourceBuffer.copy(currentChunkBuffer, currentChunkOffset, p.positions, p.positions + posBytes);
  p.positions = currentChunkOffset; // Update metadata
  
  // 2. Copy normals
  sourceBuffer.copy(currentChunkBuffer, p.positions + posBytes, p.normals, p.normals + normBytes);
  p.normals = p.positions + posBytes;
  
  // 3. Copy indices
  const newIndicesOffset = Math.ceil((p.normals + normBytes) / 4) * 4;
  sourceBuffer.copy(currentChunkBuffer, newIndicesOffset, p.indices, p.indices + indicesBytes);
  p.indices = newIndicesOffset;
  
  p.chunk = currentChunkIndex; // Update chunk assignment
  currentChunkOffset = newIndicesOffset + indicesBytes;
}

// Flush the last chunk
flushChunk();

// Delete old .bin and .bin.gz files
const oldFiles = fs.readdirSync(MODELS_DIR);
for (const file of oldFiles) {
  if (file.startsWith('body-') && (file.endsWith('.bin') || file.endsWith('.bin.gz'))) {
    fs.unlinkSync(path.join(MODELS_DIR, file));
  }
}

// Write new .bin and .bin.gz files
for (let i = 0; i < newChunks.length; i++) {
  fs.writeFileSync(path.join(MODELS_DIR, `body-${i}.bin`), newChunks[i]);
  const gzipped = zlib.gzipSync(newChunks[i], { level: 9 });
  fs.writeFileSync(path.join(MODELS_DIR, `body-${i}.bin.gz`), gzipped);
}

// Update atlas.json
atlas.parts = allOrderedParts; 
atlas.chunks = newChunkMetadata;

fs.writeFileSync(ATLAS_PATH, JSON.stringify(atlas));

console.log(`Repacked into ${newChunks.length} chunks successfully!`);
