import i18n from '@<%= appNameUpperCamelCase %>/utils/i18n';

function localeMiddleware(req, res, next) {
  req.body.locale = req.body.locale || req.query.locale
  req.body.locale && i18n.setLocale(req.body.locale);
  next();
}

export default localeMiddleware;
