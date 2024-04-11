import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pipeproperties',
  templateUrl: './pipeproperties.component.html',
  styleUrls: ['./pipeproperties.component.scss']
})
export class PipepropertiesComponent {

  constructor(private router: Router) {}

  onTabChange(event: any) {
    const index = +event;
    console.log('index: ' + index);
    const routes = ['category', 'coating', 'condition', 'grade', 'range', 'size', 'thread', 'wall', 'weight'];
    console.log('/pipeproperties/' + routes[index]);
    this.router.navigate(['/pipeproperties/' + routes[index]]);
  }
}
