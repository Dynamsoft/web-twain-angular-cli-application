import { Component, OnInit } from '@angular/core';
import { WebTwain } from 'dwt/dist/types/WebTwain';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Welcome to the brand-new world where scanners can be used seamlessly in your browsers!';
  DWTObject: WebTwain;
  selectSources: HTMLSelectElement;
  bShowDWT = false;
  bShowMore = false;
  ngOnInit() { }
  initDWT() { this.bShowDWT = true; } 
  showMore() { this.bShowMore = true; }
}
