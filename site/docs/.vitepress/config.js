import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'fstate',
  description: '下一代通用状态管理库',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '快速上手', link: '/guide/state-node' },
      { text: 'GitHub', link: 'https://github.com/jctaoo/fstate-review' },
    ],
    sidebar: {
      '/': [
        {
          text: '快速上手', children: [
            { text: "数据源 —— State Node", link: '/guide/state-node' },
            { text: "数据图中的传递者 —— Selector", link: '/guide/selector' }
          ]
        },
        {
          text: 'old', children: [
            { text: "老旧初稿", link: '/old/old' }
          ]
        }
      ],
    },
  }
})