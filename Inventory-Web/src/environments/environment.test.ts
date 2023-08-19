const packageJson = require('../../package.json');

export const environment = {
    production: false,
    appName: 'CJCSM Inventory Test',
    envName: 'test',    
    cognito:{
      userPoolId:'ca-central-1_V6ktp1b5L',
      userPoolWebClientId: '2eei3n17p7umeq2hntufsgnoh6'
    },
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