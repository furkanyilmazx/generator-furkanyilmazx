import i18n from 'i18n';

i18n.configure({
  locales: ['en', 'tr'],
  defaultLocale: 'tr',
  queryParameter: 'locale',
  updateFiles: false,
  api: {
    __: 't',
    __n: 'tn',
  },
});
export default i18n;
