import { Directive } from '@angular/core';
import {OSM} from "ol/source";
import {TileLayerDirective} from "../layers/tile-layer.directive";

@Directive({
  selector: '[osm]'
})
export class OsmDirective extends OSM {

  constructor(private readonly layer: TileLayerDirective<OSM>) {
    super();
    this.layer.setSource(this);
  }

}
