# 两晋与十六国人物画像

本组 16 位人物分别调用一次内置 `image_gen` 生成；无重试、无 CLI/API fallback。每张都是独立生成的单人画像，未使用拼图裁切或程序绘制替代。

- `prompts.json` 保存提交给工具的完整提示词。
- `generation-metadata.json` 保存工具名称、调用次数、原始文件路径与返回提示，不保存 base64。
- `manifest.json` 保存最终素材路径、实际尺寸和字节数。
- `generated/<person-id>.json` 与既有人物画像元数据结构一致，供素材验收使用。

以 `public/portraits/series/tuoba-gui.webp` 为目视画风参考；未向工具提交任何本人肖像参考。全部 `kind` 为 `imagined`，年龄、面容、神态及服饰细节均为艺术想象，不作为历史复原证据。

最终文件位于 `public/portraits/jin-sixteen-kingdoms/`，全部为 1086 × 1448 WebP。仅使用 Sharp 从原始 PNG 转换格式（quality 88），没有裁切、改色或重新绘制。

已目检全部工具生成结果，并使用 `view_image` 复核保存后的司马炎、贾南风 WebP。已核对 16 个 ID、独立文件 SHA-256、图片解码、尺寸、3:4 比例和艺术想象说明；专题画像 TypeScript 文件通过 ESLint。
