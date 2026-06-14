# 成理工程生存指南 & 飞跃手册 - 技术文档

## 1. 技术选型总览

| 类别          | 技术               | 版本 | 说明                                 |
| ------------- | ------------------ | ---- | ------------------------------------ |
| 框架          | VitePress          | 1.x  | 基于 Vite + Vue 3 的静态网站生成器   |
| 托管          | GitHub Pages       | -    | 免费静态托管，支持自定义域名和 HTTPS |
| 包管理器      | pnpm               | >=8  | 快速、磁盘占用小、严格依赖管理       |
| 运行时        | Node.js            | >=18 | VitePress 构建依赖                   |
| CI/CD         | GitHub Actions     | -    | 自动构建与部署                       |
| 代码格式化    | Prettier           | -    | Markdown 表格对齐、代码格式统一      |
| Markdown 检查 | markdownlint       | -    | Markdown 源文件规范检查              |
| 搜索          | VitePress 内置搜索 | -    | 基于 minisearch，支持中文            |

### 选型理由

**VitePress vs 其他框架：**

| 框架       | 优势                           | 劣势              | 不选的理由           |
| ---------- | ------------------------------ | ----------------- | -------------------- |
| VitePress  | Vue 生态、预设主题优秀、构建快 | 定制性略低于 Nuxt | —                    |
| Hexo       | 成熟、插件丰富                 | 主题老旧、构建慢  | 视觉效果不够现代     |
| MkDocs     | Python 生态、Material 主题     | 非 JS 生态        | 与 Vue 组件集成不便  |
| Docusaurus | React 生态、Meta 支持          | 包体积较大        | 非 Vue 生态          |
| Nuxt       | 完全自定义                     | 开发量大          | 过度设计，维护成本高 |

**GitHub Pages vs 其他托管：**

| 方案           | 优势                         | 劣势             | 说明       |
| -------------- | ---------------------------- | ---------------- | ---------- |
| GitHub Pages   | 免费、与仓库集成、自动 HTTPS | 境外服务器       | 初期首选   |
| Vercel/Netlify | 境内 CDN、PR 预览            | 免费额度有限     | 后续可迁移 |
| 阿里云 OSS     | 境内访问快                   | 需付费、配置复杂 | 备选方案   |

## 2. 项目目录结构

```text
CLGC/
├── .github/
│   └── workflows/
│       ├── deploy.yml              # 生产部署工作流
│       └── pr-check.yml            # PR 格式检查工作流
├── docs/                           # VitePress 源文件根目录
│   ├── .vitepress/
│   │   ├── config.ts               # 主配置文件（聚合各模块）
│   │   ├── utils/
│   │   │   └── sidebar.ts          # 侧边栏自动生成脚本
│   │   └── theme/
│   │       ├── index.ts            # 自定义主题入口
│   │       └── custom.css          # 自定义样式（覆盖默认主题变量）
│   ├── index.md                    # 首页
│   ├── survival/                   # 生存指南版块
│   │   ├── index.md                # 生存指南首页
│   │   ├── enrollment/             # 入学指南
│   │   │   ├── _category.md        # 分类元信息
│   │   │   ├── report-guide.md     # 报到须知
│   │   │   └── packing-list.md     # 必备物品清单
│   │   ├── academics/              # 学业相关
│   │   │   ├── _category.md
│   │   │   ├── exam-tips.md
│   │   │   └── gpa-guide.md
│   │   ├── campus-life/            # 校园生活
│   │   │   ├── _category.md
│   │   │   └── dorm-life.md
│   │   ├── campus-map/             # 校园地图（后续新增）
│   │   │   └── _category.md
│   │   ├── explore/                # 周边探索（后续新增）
│   │   │   └── _category.md
│   │   └── faq/                    # 常见问题
│   │       ├── _category.md
│   │       └── index.md
│   ├── leap/                       # 飞跃手册版块
│   │   ├── index.md                # 飞跃手册首页
│   │   ├── postgraduate/           # 考研
│   │   │   ├── _category.md
│   │   │   └── ...
│   │   ├── abroad/                 # 出国
│   │   │   ├── _category.md
│   │   │   └── ...
│   │   ├── employment/             # 就业/实习
│   │   │   ├── _category.md
│   │   │   └── ...
│   │   └── stories/                # 个人总结
│   │       ├── _category.md
│   │       └── ...
│   ├── contribute.md               # 投稿指南页面
│   ├── templates/                  # 投稿模板（供参考，不参与构建）
│   │   ├── survival-entry.md
│   │   └── leap-entry.md
│   └── public/                     # 静态资源（不经过 Vite 处理）
│       └── logo-placeholder.png
├── package.json
├── pnpm-lock.yaml
├── .prettierrc.yaml                # Prettier 配置
├── .markdownlint.yaml              # Markdownlint 配置
├── .editorconfig                   # 编辑器统一配置
├── .gitignore
└── README.md
```

### 关键文件说明

| 文件                               | 作用                                            |
| ---------------------------------- | ----------------------------------------------- |
| `docs/.vitepress/config.ts`        | VitePress 主配置，聚合导航、侧边栏、主题等配置  |
| `docs/.vitepress/utils/sidebar.ts` | 扫描目录自动生成侧边栏配置，避免手动维护        |
| `docs/.vitepress/theme/index.ts`   | 自定义主题入口，注册全局组件、覆盖默认样式      |
| `docs/.vitepress/theme/custom.css` | CSS 变量覆盖，实现品牌定制（颜色、字体等）      |
| `docs/**/_category.md`             | 每个子目录的元信息，控制分类标题、描述、排序    |
| `.github/workflows/deploy.yml`     | 推送到 main 分支时自动构建并部署到 GitHub Pages |
| `.github/workflows/pr-check.yml`   | PR 提交时自动运行 Prettier + markdownlint 检查  |

## 3. VitePress 配置详解

### 3.1 主配置文件

```typescript
// docs/.vitepress/config.ts
import { defineConfig } from 'vitepress'
import { getSidebar } from './utils/sidebar'

export default defineConfig({
  // 站点基础信息
  lang: 'zh-CN',
  title: '成理工程生存指南 & 飞跃手册',
  description: '成都理工大学工程技术学院学生生存指南与升学就业经验分享',

  // 构建输出
  outDir: '.vitepress/dist',

  // 主题配置
  themeConfig: {
    // 顶部导航
    nav: [
      { text: '首页', link: '/' },
      { text: '生存指南', link: '/survival/' },
      { text: '飞跃手册', link: '/leap/' },
      { text: '投稿指南', link: '/contribute' },
      {
        text: 'GitHub',
        link: 'https://github.com/<username>/CLGC',
      },
    ],

    // 侧边栏（自动生成）
    sidebar: {
      '/survival/': getSidebar('docs/survival'),
      '/leap/': getSidebar('docs/leap'),
    },

    // 搜索
    search: {
      provider: 'local',
    },

    // 社交链接
    socialLinks: [{ icon: 'github', link: 'https://github.com/<username>/CLGC' }],

    // 页脚
    footer: {
      message: '欢迎投稿，共建585知识库',
      copyright: '成都理工大学工程技术学院',
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/<username>/CLGC/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面',
    },
  },
})
```

### 3.2 侧边栏自动生成脚本

```typescript
// docs/.vitepress/utils/sidebar.ts
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

interface SidebarItem {
  text: string
  link?: string
  items?: SidebarItem[]
  collapsed?: boolean
}

interface CategoryMeta {
  title: string
  order: number
  collapsed: boolean
}

/**
 * 解析 _category.md 获取分类元信息
 */
function getCategoryMeta(dirPath: string): CategoryMeta {
  const categoryFile = path.join(dirPath, '_category.md')
  const defaults: CategoryMeta = {
    title: path.basename(dirPath),
    order: 99,
    collapsed: false,
  }

  if (!fs.existsSync(categoryFile)) {
    return defaults
  }

  const content = fs.readFileSync(categoryFile, 'utf-8')
  const { data } = matter(content)

  return {
    title: data.title || defaults.title,
    order: data.order ?? defaults.order,
    collapsed: data.collapsed ?? defaults.collapsed,
  }
}

/**
 * 获取目录下所有 .md 文件（排除 _category.md）
 */
function getMdFiles(dirPath: string): SidebarItem[] {
  const files = fs.readdirSync(dirPath)

  const items: { order: number; item: SidebarItem }[] = []

  for (const file of files) {
    const fullPath = path.join(dirPath, file)
    const stat = fs.statSync(fullPath)

    if (stat.isFile() && file.endsWith('.md') && file !== '_category.md' && file !== 'index.md') {
      const content = fs.readFileSync(fullPath, 'utf-8')
      const { data } = matter(content)
      const name = file.replace(/\.md$/, '')

      items.push({
        order: data.order ?? 99,
        item: {
          text: data.title || name,
          link: fullPath.replace(/^docs/, '').replace(/\.md$/, ''),
        },
      })
    }
  }

  // 按 order 排序，order 相同按文件名排序
  items.sort((a, b) => a.order - b.order || a.item.text!.localeCompare(b.item.text!))

  return items.map((i) => i.item)
}

/**
 * 递归扫描目录生成侧边栏配置
 */
export function getSidebar(dirPath: string): SidebarItem[] {
  const fullDirPath = path.resolve(dirPath)
  const entries = fs.readdirSync(fullDirPath)

  const groups: { order: number; item: SidebarItem }[] = []

  for (const entry of entries) {
    const fullPath = path.join(fullDirPath, entry)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      const meta = getCategoryMeta(fullPath)
      const children = getMdFiles(fullPath)

      if (children.length > 0) {
        groups.push({
          order: meta.order,
          item: {
            text: meta.title,
            collapsed: meta.collapsed,
            items: children,
          },
        })
      }
    }
  }

  // 按 _category.md 中的 order 排序
  groups.sort((a, b) => a.order - b.order)

  return groups.map((g) => g.item)
}
```

### 3.3 `_category.md` 文件格式

```markdown
---
title: 学业相关
order: 2
collapsed: false
---

学业相关的实用信息，包括考试备考、绩点计算、图书馆使用等。
```

| 字段        | 类型    | 默认值 | 说明                     |
| ----------- | ------- | ------ | ------------------------ |
| `title`     | string  | 目录名 | 侧边栏中显示的分类标题   |
| `order`     | number  | 99     | 排序权重，数字越小越靠前 |
| `collapsed` | boolean | false  | 侧边栏中是否默认折叠     |

## 4. 代码质量工具配置

### 4.1 Prettier

```yaml
# .prettierrc.yaml
semi: false
singleQuote: true
tabWidth: 2
trailingComma: 'es5'
printWidth: 100
proseWrap: preserve # CJK 文字不自动折行
overrides:
  - files: '*.md'
    options:
      printWidth: off # Markdown 文件不限制行长度
```

### 4.2 Markdownlint

```yaml
# .markdownlint.yaml
default: true

# 允许行长度超过 80（CJK 内容不适合严格限制）
MD013:
  line_length: 200

# 允许重复标题（不同章节下可能有相同子标题）
MD024:
  siblings_only: true

# 允许 HTML（VitePress 扩展语法需要）
MD033: false

# 允许裸 URL
MD034: false
```

### 4.3 EditorConfig

```ini
# .editorconfig
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

### 4.4 package.json scripts

```json
{
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs",
    "format": "prettier --write \"docs/**/*.md\"",
    "format:check": "prettier --check \"docs/**/*.md\"",
    "lint": "markdownlint \"docs/**/*.md\" --ignore node_modules",
    "lint:fix": "markdownlint --fix \"docs/**/*.md\" --ignore node_modules"
  }
}
```

## 5. CI/CD 配置

### 5.1 生产部署工作流

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup pnpm
        uses: pnpm/action-setup@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm docs:build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 5.2 PR 检查工作流

```yaml
# .github/workflows/pr-check.yml
name: PR Check

on:
  pull_request:
    branches: [main]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Check formatting
        run: pnpm format:check

      - name: Lint markdown
        run: pnpm lint

      - name: Build check
        run: pnpm docs:build
```

## 6. 开发环境搭建

### 6.1 前置条件

```bash
# 检查 Node.js 版本（需要 >= 18）
node --version

# 安装 pnpm（如果未安装）
corepack enable
corepack prepare pnpm@latest --activate
```

### 6.2 项目初始化

```bash
# 克隆仓库
git clone https://github.com/<username>/CLGC.git
cd CLGC

# 安装依赖
pnpm install

# 启动开发服务器（默认 http://localhost:5173）
pnpm docs:dev

# 构建生产版本
pnpm docs:build

# 预览生产构建
pnpm docs:preview
```

### 6.3 常用开发命令

| 命令                | 说明                       |
| ------------------- | -------------------------- |
| `pnpm docs:dev`     | 启动开发服务器（热更新）   |
| `pnpm docs:build`   | 构建生产版本               |
| `pnpm docs:preview` | 预览构建结果               |
| `pnpm format`       | 格式化所有 Markdown 文件   |
| `pnpm format:check` | 检查格式是否一致           |
| `pnpm lint`         | 检查 Markdown 规范         |
| `pnpm lint:fix`     | 自动修复 Markdown 规范问题 |

## 7. 暗色模式

VitePress 默认主题内置暗色模式支持，无需额外配置。页面右上角自动显示主题切换按钮。

如需自定义暗色模式下的样式，可在 `docs/.vitepress/theme/custom.css` 中覆盖 CSS 变量：

```css
/* docs/.vitepress/theme/custom.css */

/* ===== 构成主义 + 简约风格 ===== */

:root {
  /* 主色 - 深蓝系（沉稳、学术感） */
  --vp-c-brand-1: #1a237e;
  --vp-c-brand-2: #3949ab;
  --vp-c-brand-3: #5c6bc0;
  --vp-c-brand-soft: rgba(26, 35, 126, 0.14);

  /* 强调色 - 红/橙（构成主义经典色） */
  --color-accent: #d32f2f;
  --color-accent-light: #ff6659;

  /* 首页 hero 渐变 - 对角线构图 */
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(135deg, #1a237e 0%, #3949ab 50%, #d32f2f 100%);

  --vp-home-hero-image-background-image: linear-gradient(135deg, #1a237e40 0%, #3949ab30 50%, #d32f2f20 100%);
  --vp-home-hero-image-filter: blur(44px);
}

.dark {
  --vp-c-brand-1: #5c6bc0;
  --vp-c-brand-2: #3949ab;
  --vp-c-brand-3: #1a237e;
  --vp-c-brand-soft: rgba(92, 107, 192, 0.2);
  --color-accent: #ff6659;
}

/* 构成主义装饰 - h2 标题下划线 */
.vp-doc h2 {
  border-bottom: 3px solid var(--color-accent);
  padding-bottom: 0.5rem;
}

/* 对角线装饰条 */
.VPHero .name {
  position: relative;
}

.VPHero .name::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 120px;
  height: 4px;
  background: var(--color-accent);
  transform: skewX(-20deg);
}

/* 侧边栏活跃项 - 红色标记 */
.VPSidebarItem.is-active > .item > .indicator {
  background-color: var(--color-accent);
}
```

## 8. 搜索功能

使用 VitePress 内置搜索，已在配置中启用：

```typescript
// config.ts
themeConfig: {
  search: {
    provider: 'local'
  }
}
```

- 基于 minisearch，支持中文分词
- 构建时生成搜索索引，无需外部服务
- 支持标题、正文、摘要搜索
- 后续如需更强功能可升级为 Algolia DocSearch

## 9. 维护指南

### 9.1 新增内容页面

```bash
# 1. 进入对应目录
cd docs/survival/academics/

# 2. 创建新文件（英文短横线命名）
touch new-article.md

# 3. 编写内容，填写 frontmatter
# 4. 提交 PR，CI 自动检查
# 5. 合并后自动部署
```

### 9.2 新增子模块

```bash
# 1. 创建目录
mkdir -p docs/survival/new-module/

# 2. 创建分类元信息
cat > docs/survival/new-module/_category.md << 'EOF'
---
title: 新模块名称
order: 5
collapsed: false
---

模块简介。
EOF

# 3. 添加内容文件
# 4. 提交 PR
```

### 9.3 调整导航栏

编辑 `docs/.vitepress/config.ts` 中的 `nav` 数组。

### 9.4 依赖升级

```bash
# 检查过时依赖
pnpm outdated

# 升级 VitePress
pnpm add -D vitepress@latest

# 升级所有依赖
pnpm update
```

### 9.5 故障排查

| 问题               | 解决方案                                                           |
| ------------------ | ------------------------------------------------------------------ |
| 开发服务器启动失败 | 检查 Node.js 版本 >= 18，删除 `node_modules` 后重新 `pnpm install` |
| 侧边栏不显示新页面 | 检查文件是否为 `.md` 后缀，frontmatter 格式是否正确                |
| 构建报错           | 运行 `pnpm docs:build` 查看详细错误信息                            |
| 格式检查失败       | 运行 `pnpm format` 自动修复                                        |
