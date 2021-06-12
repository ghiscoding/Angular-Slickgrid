module.exports = {
  packages: {
    'angular-slickgrid': {
      ignorableDeepImportMatchers: [
        /slickgrid\//,
        /flatpickr/,
        /assign-deep/,
        /dequal/,
        /jquery-ui-dist\//,
      ]
    },
  }
};
