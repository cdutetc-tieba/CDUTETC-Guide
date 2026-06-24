# 成理工程生存指南 & 飞跃手册

成都理工大学工程技术学院学生知识库，由贴吧吧务团队运营维护，同学们共建共享。

**🔗 在线访问**：<https://cdutetc-tieba.top/>

## 📖 内容板块

### 生存指南

- **入学指南**：新生报到须知、推荐物品清单
- **学业相关**：考试备考、绩点计算、图书馆使用
- **校园生活**：宿舍、社团、校园设施
- **校园地图**：教学楼、系办、院办等功能场所（后续规划）
- **周边探索**：周边美食、旅游推荐（后续规划）
- **常见问题**：FAQ 合集

### 飞跃手册

- **考研**：备考经验、院校选择、复试技巧
- **出国**：语言考试、选校申请、文书写作
- **就业/实习**：简历面试、行业分享、实习经历
- **个人总结**：各院系同学的经验分享

### 技术文档

- 项目架构、内容设计、开发文档、贡献指南等技术资料

## 🛠️ 技术栈

- **框架**：[VitePress](https://vitepress.dev/) 1.x（基于 Vite + Vue 3）
- **托管**：GitHub Pages
- **包管理**：pnpm
- **代码质量**：Prettier + markdownlint
- **CI/CD**：GitHub Actions 自动构建部署

## 🚀 本地开发

### 环境要求

- Node.js >= 18
- pnpm >= 8

### 快速开始

```bash
# 克隆仓库
git clone https://github.com/cdutetc-tieba/CDUTETC-Guide.git
cd CDUTETC-Guide

# 安装依赖
pnpm install

# 启动开发服务器
pnpm docs:dev

# 构建生产版本
pnpm docs:build

# 预览构建结果
pnpm docs:preview
```

### 常用命令

| 命令 | 说明 |
|------|------|
| `pnpm docs:dev` | 启动开发服务器（热更新） |
| `pnpm docs:build` | 构建生产版本 |
| `pnpm docs:preview` | 预览构建结果 |
| `pnpm format` | 格式化所有 Markdown 文件 |
| `pnpm format:check` | 检查格式是否一致 |
| `pnpm lint` | 检查 Markdown 规范 |
| `pnpm lint:fix` | 自动修复 Markdown 规范问题 |

## 📝 投稿指南

### 方式一：GitHub Pull Request（推荐）

1. Fork 本仓库
2. 在对应目录下创建新的 Markdown 文件
3. 参考 `docs/templates/` 中的模板编写内容
4. 提交 Pull Request
5. 等待审核合并后自动上线

### 方式二：邮件投稿

将内容以 Word 文档形式发送至邮箱，由维护者代为上架。

### 文件命名规范

- 使用英文短横线命名（kebab-case）
- 简短且有意义
- 示例：`postgraduate-experience.md`、`dorm-life-guide.md`

### Frontmatter 模板

```yaml
---
title: 文章标题
order: 1
description: 简要描述
author: 作者名
date: 2024-01-01
---
```

## 📁 项目结构

```
CDUTETC-Guide/
├── .github/workflows/     # CI/CD 工作流
├── docs/
│   ├── .vitepress/        # VitePress 配置
│   │   ├── config.ts      # 主配置
│   │   ├── utils/sidebar.ts # 侧边栏自动生成
│   │   └── theme/         # 主题定制
│   ├── index.md           # 首页
│   ├── survival/          # 生存指南
│   ├── leap/              # 飞跃手册
│   ├── blog/              # 技术文档
│   ├── contribute.md      # 投稿指南
│   ├── templates/         # 投稿模板
│   └── public/            # 静态资源
├── package.json
├── .prettierrc.yaml
├── .markdownlint.yaml
└── .editorconfig
```

## 🎨 设计风格

采用**简约 + 构成主义**设计风格：

- 主色深蓝 `#1a237e`，强调色红 `#d32f2f`
- 几何装饰元素（对角线、圆形、方块）
- 粗体无衬线字体
- 支持暗色模式

---

> 你的经验，就是下一盏路灯。
