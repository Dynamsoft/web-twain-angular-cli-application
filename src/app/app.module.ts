import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DwtComponent } from './dwt/dwt.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  imports: [
    AppComponent, DwtComponent,
    TooltipModule.forRoot(),
    BrowserModule,
    AppRoutingModule
  ]
})
export class AppModule { }
