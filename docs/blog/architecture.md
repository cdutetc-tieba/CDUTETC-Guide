# 项目技术架构

## 技术栈

| 类别     | 技术           | 说明                                 |
| -------- | -------------- | ------------------------------------ |
| 框架     | VitePress 1.x  | 基于 Vite + Vue 3 的静态网站生成器   |
| 托管     | GitHub Pages   | 免费静态托管，支持自定义域名和 HTTPS |
| 包管理器 | pnpm ≥8        | 快速、磁盘占用小、严格依赖管理       |
| 运行时   | Node.js ≥18    | VitePress 构建依赖                   |
| CI/CD    | GitHub Actions | 自动构建与部署                       |
| 格式化   | Prettier       | Markdown 格式统一                    |
| 检查     | markdownlint   | Markdown 源文件规范检查              |
| 搜索     | VitePress 内置 | 基于 minisearch，支持中文            |

## 项目结构

```text
root/
├── .github/workflows/
│   ├── deploy.yml              # 生产部署（push main 触发）
│   └── pr-check.yml            # PR 检查（格式化 + lint + 构建）
├── docs/                       # VitePress 源文件根目录
│   ├── .vitepress/
│   │   ├── config.ts           # 主配置（导航、侧边栏、主题）
│   │   ├── utils/sidebar.ts    # 侧边栏自动生成（扫描目录 + frontmatter）
│   │   └── theme/
│   │       ├── index.ts        # 自定义主题入口（注册全局组件）
│   │       ├── custom.css      # 品牌定制样式
│   │       ├── CasesFilter.vue # 案例筛选组件
│   │       ├── cases.data.ts   # 案例数据加载器
│   │       ├── Giscus.vue      # 评论区组件
│   │       └── Watermark.vue   # 背景水印组件
│   ├── public/                 # 静态资源（图片、图标）
│   ├── survival/               # 生存指南版块
│   ├── leap/                   # 飞跃手册版块
│   ├── blog/                   # 技术文档版块
│   ├── templates/              # 投稿模板（不参与构建）
│   └── superpowers/            # 内部规划文档（不参与构建）
├── package.json
└── pnpm-lock.yaml
```

## 关键机制

### 侧边栏自动生成

`sidebar.ts` 递归扫描目录，通过 `_category.md` 文件控制分类元信息：

```yaml
---
title: 分类名称
order: 1 # 排序（越小越靠前）
collapsed: false # 是否默认折叠
---
```

每个 `.md` 文件的 frontmatter 中 `title` 和 `order` 控制其在侧边栏中的显示文本和排序。无需手动维护侧边栏配置。

### 案例筛选系统

`CasesFilter.vue` + `cases.data.ts` 实现多维度标签筛选。数据通过 VitePress `createContentLoader` 在构建时收集所有 `cases/*.md` 文件的 frontmatter，前端按标签分组过滤展示。

### 自定义主题

`theme/index.ts` 注册了三个可在 Markdown 中使用的全局组件：

- **CasesFilter** — 飞跃手册案例筛选器
- **Amap** — 校园与周边地图组件
- **HomeConcept** — 首页工程构成主义视觉组件

另外两个组件由自定义布局直接挂载：

- **Giscus** — 文章底部评论区（`doc-after` 插槽）
- **Watermark** — 背景水印装饰（`layout-bottom` 插槽）

暗色模式沿用 VitePress 的切换机制，但首页和正文页都维护独立的亮暗色设计变量。`HomeConcept.vue` 负责首页强视觉，`custom.css` 负责正文、侧栏、表格、代码块和导航等阅读界面的统一风格。完整规则见[视觉设计规范](./design-system)。

## 部署流程

1. 推送到 `main` 分支 → 触发 `deploy.yml`
2. GitHub Actions: `pnpm install` → `pnpm docs:build` → `upload-pages-artifact`
3. GitHub Pages 自动部署 → `https://cdutetc-tieba.top/`

PR 提交时触发 `pr-check.yml`：依次运行 `pnpm format:check`、`pnpm lint`、`pnpm docs:build`，确保代码质量。

## 开发指南

详见 [开发指南](./development)，常用命令：

| 命令              | 说明                     |
| ----------------- | ------------------------ |
| `pnpm docs:dev`   | 启动开发服务器（热更新） |
| `pnpm docs:build` | 构建生产版本             |
| `pnpm format`     | 格式化所有 Markdown      |
| `pnpm lint`       | 检查 Markdown 规范       |

## 维护者

本项目由成都理工大学工程技术学院贴吧吧务团队运营与维护。
