module.exports = {
  i18n: {
    defaultLocale: 'zh-TW',
    locales: ['zh-TW', 'zh-CN', 'en'],
    localeDetection: true,
  },
  fallbackLng: {
    default: ['zh-TW'],
    'zh-CN': ['zh-TW'],
    'en': ['zh-TW'],
  },
  debug: process.env.NODE_ENV === 'development',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
