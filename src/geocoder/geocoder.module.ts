import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeocodeComponent } from './geocode/geocode.component';
import {HttpClientModule} from "@angular/common/http";
import {GEOCODER_ADAPTERS, REVERSE_GEOCODER_ADAPTERS} from "./geocoder.service";
import {NasumiluService} from "./adapters/nasumilu.service";
import { ReverseGeocodeDirective } from './reverse-geocode.directive';
import { ReverseGeocodePopupComponent } from './reverse-geocode-popup/reverse-geocode-popup.component';
import {PopupModule} from "../popup/popup.module";
import {POPUP_PROVIDER} from "../popup/popup-overlay.directive";

@NgModule({
  declarations: [
    GeocodeComponent,
    ReverseGeocodeDirective,
    ReverseGeocodePopupComponent
  ],
  exports: [
    GeocodeComponent,
    ReverseGeocodeDirective
  ],
    imports: [
        CommonModule,
        HttpClientModule,
        PopupModule
    ],
  providers: [
    {provide: POPUP_PROVIDER, multi: true, useValue: ReverseGeocodePopupComponent},
    {provide: GEOCODER_ADAPTERS, multi: true, useClass: NasumiluService},
    {provide: REVERSE_GEOCODER_ADAPTERS, multi: true, useClass: NasumiluService}
  ]
})
export class GeocoderModule { }
