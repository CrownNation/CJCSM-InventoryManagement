import { Component, OnInit } from '@angular/core';

import { environment as env } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{

  title = 'Inventory-Web';
  env: string = env.envName;
  isProd = env.production;
  version: string = env.versions.app;
  year = new Date().getFullYear();
  logo = '../../assets/TallyOneLogo.png';
  navigation = [
    // { link: 'admin', label: 'Admin' },
    { link: 'dashboard', label: 'Dashboard' },
    { link: 'pipeproperties', label: 'Pipe Properties' },
    // { link: 'Equipment', label: 'Equipment' },
    // { link: 'customer', label: 'Customers' },
  ];
  navigationSideMenu = [
    ...this.navigation
  ];

  ngOnInit(): void {
  }

  onLogoutClick(){
    console.log('logout clicked');

  }
}
