import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrentPositionDirective } from './views/current-position.directive';
import { VectorLayerDirective } from './layers/vector-layer.directive';
import { TileLayerDirective } from './layers/tile-layer.directive';
import { OsmDirective } from './sources/osm.directive';
import {GeolocationDirective} from "./sources/geolocation.directive";
import { LayerStyleDirective } from './styles/layer-style.directive';
import {HttpClientModule} from "@angular/common/http";
import { LayersDirective } from './layers/layers.directive';
import { OverlaysDirective } from './overlays/overlays.directive';
import { ControlsDirective } from './controls/controls.directive';
import {WebmapComponent} from "./webmap/webmap.component";

@NgModule({
  providers: [],
  declarations: [
    WebmapComponent,
    CurrentPositionDirective,
    VectorLayerDirective,
    TileLayerDirective,
    OsmDirective,
    GeolocationDirective,
    LayerStyleDirective,
    LayersDirective,
    OverlaysDirective,
    ControlsDirective,
  ],
  exports: [
    WebmapComponent,
    CurrentPositionDirective,
    TileLayerDirective,
    OsmDirective,
    VectorLayerDirective,
    GeolocationDirective,
    LayerStyleDirective,
    LayersDirective,
    OverlaysDirective,
    ControlsDirective,
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class WebmapModule { }
