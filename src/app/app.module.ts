import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {WebmapModule} from "../webmap/webmap.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    WebmapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
