import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WebmapModule} from "../webmap/webmap.module";
import {MAP_OVERLAY} from "../webmap/overlays/overlays.directive";
import {POPUP_SERVICE, PopupOverlayDirective} from './popup-overlay.directive';
import { PopupComponent } from './popup/popup.component';
import { PopupBodyDirective } from './popup/popup-body.directive';

@NgModule({
  declarations: [
    PopupOverlayDirective,
    PopupComponent,
    PopupBodyDirective
  ],
  imports: [
    CommonModule,
    WebmapModule
  ],
  exports: [
    PopupOverlayDirective,
    PopupBodyDirective,
    PopupComponent
  ],
  providers: [
    {provide: MAP_OVERLAY, multi: true, useClass: PopupOverlayDirective},
    {provide: POPUP_SERVICE, multi: false, useClass: PopupOverlayDirective}
  ]
})
export class PopupModule {
}
