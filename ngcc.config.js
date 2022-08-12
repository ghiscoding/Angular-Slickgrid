module.exports = {
  packages: {
    'angular-slickgrid': {
      ignorableDeepImportMatchers: [
        /assign-deep/,
        /dequal/,
        /flatpickr/,
        /jquery-ui/,
        /slickgrid\//,
      ]
    },
  }
};
