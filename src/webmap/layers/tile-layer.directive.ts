import {Directive} from '@angular/core';
import TileSource from "ol/source/Tile";
import TileLayer from "ol/layer/Tile";
import {MAP_LAYER} from "./layers.directive";

@Directive({
  selector: 'tile-layer',
  providers: [ {provide: MAP_LAYER, multi: true, useExisting: TileLayerDirective }]
})
export class TileLayerDirective<T extends TileSource> extends TileLayer<T>{
  constructor() {
    super();
  }
}
