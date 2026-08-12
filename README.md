# Perry's Galaxy

Perry 的个人博客，记录生命科学、计算、AI、论文阅读、方法和日常思考。基于 Hexo 与 AnZhiYu 主题。

公开内容遵循 **Show identity, not secrets**：网站只展示通用知识与个人思考，不发布未公开研究项目、内部数据或实验信息。

## 本地运行

```bash
pnpm install
pnpm dev
```

浏览器访问 `http://localhost:4000`。

## 写一篇文章

```bash
pnpm exec hexo new "文章标题"
```

文章会创建在 `source/_posts`。打开生成的 Markdown 文件，填写分类、标签、封面和正文即可。

## 生成静态网站

```bash
pnpm build
```

生成结果位于 `public` 文件夹，可部署到 GitHub Pages、Cloudflare Pages、Vercel 或任意静态网站服务。

## 常用配置

- 网站名称、作者、地址：`_config.yml`
- 导航、配色、侧栏和功能：`_config.anzhiyu.yml`
- 自定义样式：`source/css/perry.css`
- 文章与页面：`source/_posts`、`source/about`
