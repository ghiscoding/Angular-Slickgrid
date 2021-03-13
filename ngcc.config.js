module.exports = {
  packages: {
    'angular-slickgrid': {
      ignorableDeepImportMatchers: [
        /slickgrid\//,
        /flatpickr/,
        /jquery-ui-dist\//,
      ]
    },
  }
};
