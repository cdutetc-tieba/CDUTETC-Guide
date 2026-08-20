---
title: 投稿指南
---

# 投稿指南

感谢你愿意为成理工程 生存指南&飞跃手册 贡献内容！本页面介绍如何投稿。

## 投稿方式

### 方式一：GitHub Pull Request（推荐）

### 1. Fork 仓库

点击仓库右上角 **Fork** 按钮，将 [cdutetc-tieba/CDUTETC-Guide](https://github.com/cdutetc-tieba/CDUTETC-Guide) 复制到你的账号下。

### 2. 克隆你的 Fork

```bash
git clone https://github.com/你的用户名/CDUTETC-Guide.git
cd CDUTETC-Guide
git remote add upstream https://github.com/cdutetc-tieba/CDUTETC-Guide.git
```

### 3. 创建分支并编写内容

```bash
git checkout -b feat/你的功能名称
```

在对应目录下创建新的 Markdown 文件，参考下方模板和规范编写内容。

### 4. 提交前检查

```bash
pnpm format        # 格式化 Markdown
pnpm lint          # 检查 Markdown 规范
pnpm docs:build    # 验证构建
```

### 5. 提交并推送

```bash
git add .
git commit -m "feat: 描述你的修改"
git push origin feat/你的功能名称
```

### 6. 提交 Pull Request

在 GitHub 上创建 PR（从你的 fork 分支 → `cdutetc-tieba/main`），等待审核合并后自动上线。

### 方式二：邮件投稿

如果你不熟悉 Git 操作，可以将内容以 Markdown 或 Word 文档形式发送至邮箱：

> 投稿邮箱：**cdutetc.tieba@outlook.com**

由维护者代为上架。请在邮件中注明投稿内容所属的分区。

---

## 投稿模板

### 生存指南模板

```markdown
---
title: 文章标题
order: 1
description: 文章简介
---

# 文章标题

## 第一节

正文内容...

## 第二节

正文内容...
```

### 飞跃手册模板

```markdown
---
title: 文章标题
order: 1
description: 文章简介
author: 作者名
department: 院系
major: 专业
year: 毕业年份
destination: 升学或就业去向
type: 考研 | 出国 | 就业
date: YYYY-MM-DD
---

# 文章标题

## 个人背景

<!-- 与选择和结果相关的背景，可匿名或模糊隐私信息 -->

## 选择与准备过程

<!-- 为什么选择、时间线、实际投入、调整与失败 -->

## 结果与复盘

<!-- 实际结果、现在会如何重做，以及经验的适用边界 -->
```

---

## 文件命名规范

- 使用英文短横线命名（kebab-case）
- 简短且有意义
- 示例：`postgraduate-experience.md`、`dorm-life-guide.md`

## Frontmatter 说明

每个 Markdown 文件顶部必须填写 frontmatter 元数据：

```yaml
---
title: 文章标题 # 必填
order: 1 # 排序权重，数字越小越靠前
description: 简要描述 # 用于 SEO
author: 作者名 # 飞跃手册文章建议填写
date: 2024-01-01 # 发布日期
---
```

## 内容规范

- 使用 Markdown 语法
- 只提交本人经历或已获得明确授权的访谈，不拼接、虚构上岸案例
- 区分亲历、转述和个人判断，涉及政策、费用与申请规则时注明来源和时间
- 提供与结论相关的背景、投入、失败和结果，不把单一个案写成普遍规律
- 尊重他人隐私
- 不包含敏感或违规内容
- 代码块需指定语言（如 ` ```bash `、` ```text `）

## 常见 CI 问题

### Prettier 格式检查失败

运行 `pnpm format` 自动修复。

### Markdownlint 规范检查失败

运行 `pnpm lint:fix` 自动修复，或查看错误提示手动修改。

### 构建失败

运行 `pnpm docs:build` 查看具体错误信息。

## 内容审核

所有内容提交后会经过审核，审核通过后合并到主分支并自动部署。

---

如有问题，请通过 [GitHub Issues](https://github.com/cdutetc-tieba/CDUTETC-Guide/issues) 反馈。
