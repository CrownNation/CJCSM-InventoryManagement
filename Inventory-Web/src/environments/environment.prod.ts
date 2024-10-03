const packageJson = require('../../package.json');


export const environment = {
    production: true,
    appName: 'CJCSM Inventory',
    envName: 'production',
    apiUrl: 'https://localhost:7040/',    
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
      },
      firebaseConfig: {
        apiKey: "AIzaSyCcmTwVO6nmNfYmOqvOw8xM02-B7WWDCv0",
        authDomain: "cjcsm-test-auth.firebaseapp.com",
        projectId: "cjcsm-test-auth",
        storageBucket: "cjcsm-test-auth.appspot.com",
        messagingSenderId: "968917081415",
        appId: "1:968917081415:web:5e4d9de8e1922d15618062",
        measurementId: "G-KWFZ80LV3W"
    }

  };