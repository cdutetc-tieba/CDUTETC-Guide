---
title: 开发指南
order: 2
description: 本地开发环境搭建与常用命令
---

# 开发指南

## 环境要求

- Node.js >= 18
- pnpm >= 8

## 快速开始

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

## 常用命令

| 命令                | 说明                       |
| ------------------- | -------------------------- |
| `pnpm docs:dev`     | 启动开发服务器（热更新）   |
| `pnpm docs:build`   | 构建生产版本               |
| `pnpm docs:preview` | 预览构建结果               |
| `pnpm format`       | 格式化所有 Markdown 文件   |
| `pnpm format:check` | 检查格式是否一致           |
| `pnpm lint`         | 检查 Markdown 规范         |
| `pnpm lint:fix`     | 自动修复 Markdown 规范问题 |

## 提交前检查

提交代码前务必运行以下命令，确保 CI 检查通过：

```bash
# 格式化
pnpm format

# 检查规范
pnpm lint

# 构建验证
pnpm docs:build
```

## 目录约定

| 文件/目录      | 说明                                    |
| -------------- | --------------------------------------- |
| `_category.md` | 子目录的元信息（标题、排序）            |
| `index.md`     | 目录的首页内容                          |
| 内容文件       | 使用 kebab-case 命名，如 `exam-tips.md` |

## Frontmatter 规范

```yaml
---
title: 文章标题 # 必填，显示在侧边栏
order: 1 # 排序权重，数字越小越靠前
description: 描述 # 用于 SEO
author: 作者名 # 飞跃手册文章建议填写
date: 2024-01-01 # 发布日期
---
```

## 代码规范说明

### Prettier

- 配置文件：`.prettierrc.yaml`
- Markdown 文件 `printWidth` 设为 200（避免自动换行破坏格式）
- 提交前运行 `pnpm format` 自动格式化

### Markdownlint

- 配置文件：`.markdownlint.yaml`
- 已禁用 `MD025`（VitePress frontmatter 会自动生成 h1，内容中再写 h1 会冲突）
- 代码块需指定语言（如 ` ```bash `、` ```text `）
- 目录结构展示使用 ` ```text `

## 部署流程

向 `main` 提交 Pull Request 时，`pr-check.yml` 自动：

1. 安装依赖
2. 检查格式（`pnpm format:check`）
3. 检查规范（`pnpm lint`）
4. 构建站点

变更合并并推送到 `main` 后，`deploy.yml` 会重新安装依赖、构建站点并部署到 GitHub Pages。

网站地址：https://cdutetc-tieba.top/
