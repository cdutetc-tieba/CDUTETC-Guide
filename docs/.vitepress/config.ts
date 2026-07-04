import { defineConfig } from 'vitepress'
import { getSidebar } from './utils/sidebar'

export default defineConfig({
  base: '/',
  lang: 'zh-CN',
  title: '成理工程生存指南 & 飞跃手册',
  description: '成都理工大学工程技术学院学生生存指南与升学就业经验分享',

  srcExclude: ['superpowers/**', 'templates/**'],
  ignoreDeadLinks: false,

  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/tieba.ico' }]
  ],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '生存指南', link: '/survival/' },
      { text: '飞跃手册', link: '/leap/' },
      { text: '技术文档', link: '/blog/' },
      { text: '投稿指南', link: '/contribute' },
      {
        text: 'GitHub',
        link: 'https://github.com/cdutetc-tieba/CDUTETC-Guide'
      }
    ],

    sidebar: {
      '/survival/': getSidebar('docs/survival'),
      '/leap/': getSidebar('docs/leap'),
      '/blog/': getSidebar('docs/blog')
    },

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/cdutetc-tieba/CDUTETC-Guide' }
    ],

    footer: {
      message: '本文档由成都理工大学工程技术学院贴吧吧务团队运营与维护',
      copyright: '成都理工大学工程技术学院'
    },

    editLink: {
      pattern: 'https://github.com/cdutetc-tieba/CDUTETC-Guide/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    }
  }
})
