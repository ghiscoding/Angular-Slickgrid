import resolve from 'rollup-plugin-node-resolve';

// Add here external dependencies that actually you use.
const globals = {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/router': 'ng.router',
    /*
    'rxjs/Observable': 'Rx',
    'rxjs/Observer': 'Rx',
    'rxjs/add/operator/map': 'Rx',
    */
    'moment': 'moment',
    'jquery': 'jquery'
};

export default {
    entry: './dist/modules/angular-slickgrid.es5.js',
    dest: './dist/bundles/angular-slickgrid.umd.js',
    format: 'umd',
    exports: 'named',
    moduleName: 'ng.angularLibraryStarter',
    plugins: [resolve()],
    external: Object.keys(globals),
    globals: globals,
    onwarn: () => { return }
}
