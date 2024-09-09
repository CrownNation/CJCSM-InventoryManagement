const packageJson = require('../../package.json');

export const environment = {
    production: false,
    appName: 'CJCSM Inventory Test',
    envName: 'Test',
    apiUrl: 'https://cjcsm-tally-test-api-471278581662.us-west1.run.app/',    
    versions: {
        app: packageJson.version,
        angular: packageJson.dependencies['@angular/core'],
        ngrx: packageJson.dependencies['@ngrx/store'],
        material: packageJson.dependencies['@angular/material'],
        bootstrap: packageJson.dependencies.bootstrap,
        rxjs: packageJson.dependencies.rxjs,
        ngxtranslate: packageJson.dependencies['@ngx-translate/core'],
        fontAwesome: packageJson.dependencies['@fortawesome/fontawesome-free-webfonts'],
        angularCli: packageJson.devDependencies['@angular/cli'],
        typescript: packageJson.devDependencies['typescript'],
        cypress: packageJson.devDependencies['cypress']
      }
  };