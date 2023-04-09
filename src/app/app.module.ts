import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {WebmapModule} from "../webmap/webmap.module";
import {PopupModule} from "../popup/popup.module";
import {GeocoderModule} from "../geocoder/geocoder.module";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        WebmapModule,
        PopupModule,
        GeocoderModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
