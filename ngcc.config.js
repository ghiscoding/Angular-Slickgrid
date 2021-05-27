module.exports = {
  packages: {
    'angular-slickgrid': {
      ignorableDeepImportMatchers: [
        /slickgrid\//,
        /flatpickr/,
        /dequal/,
        /jquery-ui-dist\//,
      ]
    },
  }
};
