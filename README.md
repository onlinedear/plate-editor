# plate 编辑器
一个基于 slate + platejs 的AI编辑器 [体验地址](https://plate-editor.liushuaiyang.com/editor)
> 快来体验AI编辑器有什么不一样吧

## Features
- 支持 AI 生成内容
- 优雅的 UI 设计
- 支持导出PDF、导出图片、生成`html格式`字符串
- 支持代码高亮
- 支持图片、视频、音频、文件上传
- 支持文件上传
- 支持表格
- 支持拖拽
- 支持快捷键

## 安装

```bash
pnpm install
```

### 运行

配置 `.env.local`:

- `OPENAI_API_KEY` – DeepSeek API key ([点击获取](https://platform.deepseek.com/api_keys))
- DeepSeek API 文档 - [DeepSeek API](https://api-docs.deepseek.com/zh-cn/)

```bash
pnpm dev
```

访问 http://localhost:3000/editor 
