import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebmapComponent } from './webmap/webmap.component';



@NgModule({
  providers: [],
  declarations: [
    WebmapComponent
  ],
  exports: [
    WebmapComponent
  ],
  imports: [
    CommonModule
  ]
})
export class WebmapModule { }
