import { Component, OnInit } from '@angular/core';

import { environment as env } from 'src/environments/environment';

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
  logo = '../../assets/cjcsm_logo_small.png';
  navigation = [
    { link: 'admin', label: 'Admin' },
    { link: 'dashboard', label: 'Dashboard' },     
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
