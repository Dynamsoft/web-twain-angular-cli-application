import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { setTheme } from 'ngx-bootstrap/utils';

import { WebTwain } from 'dwt/dist/types/WebTwain';
import { DwtComponent } from './dwt/dwt.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    DwtComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Welcome to the brand-new world where scanners can be used seamlessly in your browsers!';
  DWTObject: WebTwain;
  selectSources: HTMLSelectElement;
  bShowDWT = false;
  bShowMore = false;

  constructor() {
    setTheme('bs5');
  }

  ngOnInit() { }
  initDWT() { this.bShowDWT = true; } 
  showMore() { this.bShowMore = true; }
}
