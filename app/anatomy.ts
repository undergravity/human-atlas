export type SystemId = 'skeletal'|'muscular'|'arterial'|'venous'|'nervous'|'digestive'|'respiratory'|'urinary'|'reproductive'|'lymphatic'|'endocrine'|'integumentary'|'connective'|'sensory'|'cardiac';
export const SYSTEMS: {id:SystemId;name:string;nameZh:string;color:string;description:string;descriptionZh:string}[] = [
 {id:'skeletal',name:'Skeleton',nameZh:'骨骼系统',color:'#e2d9ba',description:'Bones form the supporting framework of the body, protect organs, and provide attachment points for muscles. Their internal tissue also stores minerals and produces blood cells.',descriptionZh:'骨骼构成了身体的支撑框架，保护内部器官，并为肌肉提供附着点。其内部组织还储存矿物质并产生血细胞。'},
 {id:'muscular',name:'Muscles',nameZh:'肌肉系统',color:'#a85b50',description:'Skeletal muscles generate movement by pulling on their attachments. Together with tendons, they move joints, stabilize posture, and produce heat.',descriptionZh:'骨骼肌通过拉动附着点产生运动。它们与肌腱一起转动关节、稳定姿势并产生热量。'},
 {id:'cardiac',name:'Heart',nameZh:'心脏',color:'#b96760',description:'The heart is a muscular pump with four chambers. Its valves direct blood forward through the pulmonary and systemic circuits.',descriptionZh:'心脏是一个有四个腔室的肌肉泵。它的瓣膜引导血液通过肺循环和体循环。'},
 {id:'sensory',name:'Sensory organs',nameZh:'感觉器官',color:'#b0c8ce',description:'These structures contribute to special senses, including sight, hearing, and balance. Their specialized tissues detect stimuli and work with the nervous system to convey information.',descriptionZh:'这些结构负责特殊感觉，包括视觉、听觉和平衡。其特化组织检测刺激并与神经系统合作传递信息。'},
 {id:'arterial',name:'Arteries',nameZh:'动脉',color:'#c05245',description:'The heart drives blood through the circulation. Arteries carry blood away from the heart to supply tissues or, in the pulmonary circuit, to the lungs.',descriptionZh:'心脏推动血液循环。动脉将血液从心脏输送出来为组织供血，在肺循环中则输送到肺部。'},
 {id:'venous',name:'Veins',nameZh:'静脉',color:'#527c9f',description:'Veins return blood toward the heart. Superficial and deep networks collect blood from the tissues; the pulmonary veins bring oxygenated blood back from the lungs.',descriptionZh:'静脉使血液回流心脏。浅层和深层网络从组织收集血液；肺静脉将含氧血液从肺部带回。'},
 {id:'nervous',name:'Nervous system',nameZh:'神经系统',color:'#d8b565',description:'The brain, spinal cord, and peripheral nerves carry and process signals. They support sensation, movement, coordination, and automatic regulation of body functions.',descriptionZh:'大脑、脊髓和周围神经传递并处理信号。它们支持感觉、运动、协调和身体功能的自动调节。'},
 {id:'respiratory',name:'Respiratory',nameZh:'呼吸系统',color:'#b98991',description:'The airways conduct air to the lungs, where oxygen and carbon dioxide move between air and blood. Breathing depends on pressure changes produced by respiratory muscles.',descriptionZh:'气道将空气引导至肺部，氧气和二氧化碳在空气和血液之间进行交换。呼吸依赖于呼吸肌产生的压力变化。'},
 {id:'digestive',name:'Digestive',nameZh:'消化系统',color:'#b8916b',description:'The digestive tract breaks down food, absorbs nutrients and water, and moves waste onward. Accessory organs contribute bile and digestive enzymes.',descriptionZh:'消化道分解食物，吸收营养和水分，并将废物向下移动。附属器官提供胆汁和消化酶。'},
 {id:'urinary',name:'Urinary',nameZh:'泌尿系统',color:'#b47961',description:'The kidneys filter blood and regulate fluid, electrolyte, and acid–base balance. Urine travels through the ureters to the bladder and exits through the urethra.',descriptionZh:'肾脏过滤血液并调节体液、电解质和酸碱平衡。尿液通过输尿管输送到膀胱，并通过尿道排出。'},
 {id:'lymphatic',name:'Lymphatic',nameZh:'淋巴系统',color:'#879f7c',description:'Lymphatic vessels return excess tissue fluid to the circulation. Lymph nodes and other lymphoid organs support immune surveillance and responses.',descriptionZh:'淋巴管将多余的组织液返回循环系统。淋巴结和其他淋巴器官支持免疫监视和反应。'},
 {id:'endocrine',name:'Endocrine',nameZh:'内分泌系统',color:'#c5a09a',description:'Endocrine organs release hormones into the blood to coordinate processes such as metabolism, growth, stress responses, and reproduction.',descriptionZh:'内分泌器官将激素释放到血液中，以协调代谢、生长、应激反应和生殖等过程。'},
 {id:'reproductive',name:'Reproductive',nameZh:'生殖系统',color:'#bda098',description:'The male reproductive structures represented here contribute to sperm production, maturation, transport, and the production of sex hormones.',descriptionZh:'此处展示的男性生殖结构参与精子的产生、成熟、运输以及性激素的分泌。'},
 {id:'integumentary',name:'Body surface',nameZh:'体表系统',color:'#ba9b7d',description:'The body surface provides an outer anatomical reference. The integumentary system forms a protective barrier and contributes to sensation and temperature regulation.',descriptionZh:'体表提供外部解剖学参考。皮肤系统形成保护屏障并有助于感觉和体温调节。'},
 {id:'connective',name:'Connective tissue',nameZh:'结缔组织',color:'#aec3bb',description:'Cartilage, ligaments, and other connective tissues support, connect, and separate structures. Their roles include stabilizing joints and distributing mechanical loads.',descriptionZh:'软骨、韧带和其他结缔组织支持、连接并分隔各个结构。其作用包括稳定关节和分布机械负荷。'},
];
export interface Part {id:string;name:string;nameZh?:string;conceptId:string;system:SystemId;chunk:number;positions:number;normals:number;indices:number;vertexCount:number;indexCount:number;bounds:[number[],number[]]}
export interface Concept {id:string;name:string;nameZh?:string;elements:string[]}
export interface Atlas {version:string;sex?:'male';source?:string;scope?:string;parts:Part[];concepts:Concept[];chunks:{url:string;bytes:number;gzip?:string;gzipBytes?:number}[];triangles:number}
export type View = 'three-quarter'|'front'|'back'|'side';
export interface SceneState {inspectorOpen?:boolean;explode:number;visible:SystemId[];selected:string[];isolate:boolean;focus?:number;hidden?:string[];view:View;rotate:boolean;reset:number}
export const DEFAULT_VISIBLE:SystemId[] = ['skeletal','muscular'];
import EXPLANATIONS_DATA from './explanations.json';
export const EXPLANATIONS = EXPLANATIONS_DATA as Record<string, {en:string;zh:string}>;
export function explanation(name:string,system:SystemId,lang:'en'|'zh'='en'){
  const term = name.toLowerCase();
  if (EXPLANATIONS[term]) {
    return EXPLANATIONS[term][lang];
  }
  // Try to match base name without left/right prefix
  const stripped = term.replace(/^(left|right)\s+/,'');
  if (EXPLANATIONS[stripped]) {
    return EXPLANATIONS[stripped][lang];
  }
  // Try to match "X part of Y" → look up Y
  const ofMatch = term.match(/^.+?\s+(?:part|head|belly)\s+of\s+(?:left\s+|right\s+)?(.+)$/);
  if (ofMatch && EXPLANATIONS[ofMatch[1]]) {
    return EXPLANATIONS[ofMatch[1]][lang];
  }
  const sys = SYSTEMS.find(s=>s.id===system);
  return sys ? (lang==='zh' ? sys.descriptionZh : sys.description) : '';
}

