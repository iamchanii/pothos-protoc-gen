import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'pothos-protoc-gen',
  base: '/pothos-protoc-gen/',
  head: [['link', { rel: 'icon', href: '/pothos-protoc-gen/logo.svg' }]],
  themeConfig: {
    logo: '/logo.svg',
    sidebar: [
      { text: 'Getting Started', link: '/' },
      { text: 'Installation', link: '/installation' },
      { text: 'Configuration', link: '/configuration' },
      { text: 'References', link: '/references' },
    ],

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/iamchanii/pothos-protoc-gen',
      },
    ],
  },
});
