# Human Atlas (人体图谱)

[English](#english) | [简体中文](#简体中文)

---

<a id="english"></a>
## English

> **Acknowledgments:**  
> This project is a modified and enhanced version based on [ashemag/human-atlas](https://github.com/ashemag/human-atlas). The original application code is released under the [MIT License](LICENSE). The anatomy data used in this project is based on **BodyParts3D 4.0**, licensed under **CC BY 4.0**. Please preserve the attribution to the original author and data source when redistributing. We express our sincere gratitude to the original author for their open-source spirit!

An interactive 3D anatomy explorer built with React, Three.js, and shadcn/ui. Take the BodyParts3D adult male reference apart into **2,234 individually selectable meshes**, explore **15 anatomical systems**, and search **3,432 named concepts**.

**[Explore the live demo](https://human-atlas-2s7.pages.dev)**

### 🌟 New Features in this Fork

- **Bilingual Terminology**: Added a comprehensive English-to-Chinese dictionary (`dict.json`) for anatomical terms, enabling localized searching and display.
- **Detailed Anatomical Explanations**: Integrated bilingual medical descriptions (`explanations.json`) for major organs and systems to enhance the educational value.
- **Individual Structure Toggling**: Added the ability to hide or show individual muscles and structures one by one, simulating a true anatomical dissection experience.
- **Dark Mode**: Fully implemented a sleek dark mode for a better viewing experience in low-light environments.
- **Advanced Gestures**: Introduced new interaction gestures, including intuitive cylinder rotation gestures for smoother 3D model inspection.
- **Enhanced Mobile Adaptation**: Optimized layouts, controls, and touch interactions to provide a seamless experience on mobile devices.
- **Progressive Web App (PWA)**: Fully installable application with smart native prompts and device-specific offline fallbacks.
- **Two-Phase Async Loading**: Drastically improved initial load times by prioritizing the download of Skeletal and Muscular systems first to unlock the UI instantly, while silently fetching remaining systems in the background.

### Explore

- Orbit, zoom, and select structures directly on the body.
- Toggle individual systems or use skeleton and organ presets.
- Move from assembled anatomy to a spaced inventory of every visible piece.
- Search anatomical names and source identifiers.
- Isolate a selected structure and read its details.
- Use compact controls and detail panels on mobile.

### Run locally

Requires Node.js 22.13 or newer. No API keys or accounts are needed.

```sh
npm ci
npm run dev
```

Open http://localhost:3016. To build the static site, run `npm run build`; the output is in `dist/`.

### Validate

```sh
npm run check
node scripts/validate-atlas.mjs
node scripts/validate-interactions.mjs
npm run build
```

Validation covers mesh buffers, names and concept membership, nonoverlapping exploded layouts at desktop and mobile aspect ratios, search and inspection contracts, and tap-versus-drag handling. Browser interaction checks have exercised selection, system controls, search, isolation, rotation, and 390×844, 320×568, and 844×390 layouts. Phone controls stay clear of the exploded inventory, and isolated structures fit the space above or beside the detail panel. Physical-device performance and real multitouch hardware have not been tested.

### Anatomy data

The current viewer uses **BodyParts3D 4.0**, an adult male reference anatomy, licensed **CC BY 4.0**. It does not represent every human structure or variation. Individual source meshes are distinct from named concepts, which may group multiple meshes. Descriptions distinguish general system context from individual organ explanations.

Geometry is simplified for browser performance while retaining every source mesh. The packaged model contains 2,288,268 triangles and downloads approximately 33 MB of compressed geometry. Full credits, source links, and adaptation details are in [ATTRIBUTION.md](public/ATTRIBUTION.md).

This is an educational explorer, not a diagnostic or surgical tool.

### How it works

Geometry is merged into batches. Per-structure GPU textures control translation, visibility, and selection, while component geometry supports accurate picking. Exploded layouts pack only the visible pieces. Rendering updates when the scene changes; orbit controls remain responsive without thousands of separate draw calls.

The optional WebMCP tools expose anatomy search and inspection in compatible browsers. The visible interface works without them.

### Rebuilding geometry

The repository includes browser-ready geometry. Rebuilding it is optional: obtain the official BodyParts3D OBJ archive and English metadata tables, prepare the joined concepts and display-system mappings, run `scripts/convert-anatomy.py`, then `node scripts/optimize-anatomy.mjs` and `node scripts/compress-models.mjs`. Simplification uses a 0.2% relative error limit per structure.

### Deploy

Import this repository into Vercel as a Vite project. The included `vercel.json` configures `npm ci`, `npm run build`, and the `dist` output directory. It can also be served by a static host.

### License

Original application code is released under the [MIT License](LICENSE). **The anatomy data has its own CC BY 4.0 license**; preserve the attribution when redistributing it. Third-party dependencies retain their respective licenses.

Issues and pull requests are welcome. Please include reproduction steps and browser/device details for interaction problems.

---

<a id="简体中文"></a>
## 简体中文

> **鸣谢声明：**  
> 本项目基于 [ashemag/human-atlas](https://github.com/ashemag/human-atlas) 进行二次开发和功能增强。原项目应用程序代码采用 [MIT 许可证](LICENSE)发布。本项目使用的解剖数据基于 **BodyParts3D 4.0**，采用 **CC BY 4.0** 许可证。在重新分发或使用本数据时，请务必保留对原作者及数据源的署名。特此向原作者的开源精神表示感谢！

这是一个使用 React、Three.js 和 shadcn/ui 构建的交互式 3D 解剖学探索工具。您可以将 BodyParts3D 的成年男性参考模型拆解为 **2,234 个可独立选择的网格**，探索 **15 个解剖系统**，并搜索 **3,432 个命名概念**。

**[体验在线演示](https://human-atlas-2s7.pages.dev)**

### 🌟 本分支新增功能

- **双语专业术语**：新增了解剖学术语的中英对照词典 (`dict.json`)，支持本地化的搜索与展示。
- **详尽的解剖学解释**：集成了主要器官和系统的双语医学科普解释 (`explanations.json`)，进一步提升了教育和科普价值。
- **逐个结构隐藏/显示**：新增了支持逐个隐藏或显示单一肌肉及结构的功能，完美模拟真实的解剖剥离效果。
- **暗夜模式**：全面支持暗黑主题，在弱光环境下提供更舒适、更护眼的视觉体验。
- **高级交互手势**：引入了全新的触控与鼠标交互，包括符合直觉的“圆柱体手势 (Cylinder Gestures)”，使 3D 模型的全方位观察更加流畅自然。
- **移动端深度适配**：针对手机和平板的屏幕尺寸及触控习惯进行了专属优化，确保在各种移动设备上都能获得丝滑的使用体验。
- **PWA 渐进式应用**：支持直接将网站安装为桌面或手机 App，内置智能设备识别和针对性安装引导。
- **两阶段后台异步加载 (极速优化)**：打破了原本一次性加载全量数据的瓶颈，首屏仅优先拉取骨骼与肌肉的二进制模型，瞬间解锁可交互的 3D 界面；其余神经、血管等系统则在后台静默异步下载，既保证了首屏极速加载，又实现了后续模块的“秒开”切换。

### 功能探索

- 直接在人体模型上进行环绕、缩放和选择结构。
- 切换各个独立的系统，或使用骨骼和器官预设。
- 从完整的解剖结构切换到包含所有可见部件的间隔清单视图。
- 搜索解剖学名称和来源标识符。
- 隔离选定的结构并阅读其详细说明。
- 在移动端提供紧凑的控件和详细信息面板。

### 本地运行

需要 Node.js 22.13 或更新版本。无需 API 密钥或注册账号。

```sh
npm ci
npm run dev
```

打开 http://localhost:3016。要构建静态站点，请运行 `npm run build`；输出文件将位于 `dist/` 目录中。

### 验证与测试

```sh
npm run check
node scripts/validate-atlas.mjs
node scripts/validate-interactions.mjs
npm run build
```

验证范围涵盖网格缓冲区、名称与概念的从属关系、桌面和移动设备长宽比下不重叠的展开布局、搜索和检查契约，以及点击与拖动处理。浏览器交互检查测试了选择、系统控制、搜索、隔离、旋转，以及 390×844、320×568 和 844×390 布局。手机端控件不会遮挡展开的组件清单，隔离的结构能够适应详情面板上方或旁边的空间。未在物理设备上测试性能和真实的多点触控硬件。

### 解剖数据

当前的查看器使用 **BodyParts3D 4.0**，这是一个成年男性参考解剖模型，采用 **CC BY 4.0** 许可。它并不代表所有人体结构或个体差异。各个源网格不同于命名概念，一个概念可能包含多个网格。描述区分了整体系统背景和单个器官的解释。

为了提升浏览器性能，几何图形在保留所有源网格的同时进行了简化。打包后的模型包含 2,288,268 个三角形，下载的压缩几何数据大约为 33 MB。完整的致谢名单、来源链接以及修改细节请参阅 [ATTRIBUTION.md](public/ATTRIBUTION.md)。

本项目是一个用于教育的探索工具，而非诊断或外科手术工具。

### 工作原理

几何体被合并为批次处理。每个结构的 GPU 纹理控制着平移、可见性和选择状态，而组件几何体支持精确的拾取（Picking）。展开布局只打包可见的部分。场景发生变化时会更新渲染；在没有数千个独立绘制调用的情况下，轨道控制仍然保持流畅响应。

可选的 WebMCP 工具在兼容的浏览器中暴露了解剖学搜索和检查功能。即使没有它们，可见界面也可以正常工作。

### 重新构建几何体

代码库中已包含适用于浏览器的现成几何体。重新构建是可选的：你需要获取官方的 BodyParts3D OBJ 压缩包和英文元数据表，准备合并的概念和显示系统映射，然后运行 `scripts/convert-anatomy.py`，接着运行 `node scripts/optimize-anatomy.mjs` 和 `node scripts/compress-models.mjs`。简化过程对每个结构使用 0.2% 的相对误差限制。

### 部署

将此代码库作为 Vite 项目导入 Vercel。包含的 `vercel.json` 配置了 `npm ci`、`npm run build` 和 `dist` 输出目录。也可以由任何静态主机提供服务。

### 许可证

原项目应用程序代码在 [MIT 许可证](LICENSE) 下发布。**解剖数据拥有独立的 CC BY 4.0 许可证**；在重新分发时请保留署名。第三方依赖项保留其各自的许可证。

欢迎提交 Issue 和 Pull Request。如果遇到交互问题，请提供重现步骤和浏览器/设备信息。
