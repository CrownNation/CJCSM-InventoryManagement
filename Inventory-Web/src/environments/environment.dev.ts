const packageJson = require('../../package.json');

export const environment = {
    production: false,
    appName: 'CJCSM Inventory Dev',
    envName: 'development',    
    cognito: {
      region: 'us-east-2',
      userPoolId:'us-east-2_RyeY0OlTL',
      userPoolWebClientId: '5ijnmuh5jnbtsj3f8gtik1770m'
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