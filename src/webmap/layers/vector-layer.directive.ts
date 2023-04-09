import {Directive, Input} from '@angular/core';
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {MAP_LAYER} from "./layers.directive";

@Directive({
  selector: 'vector-layer',
  providers: [ {provide: MAP_LAYER, multi: true, useExisting: VectorLayerDirective }]
})
export class VectorLayerDirective<T extends VectorSource> extends VectorLayer<T> {

  constructor() {
    super();
  }

  @Input() get maxZoom(): number {
    return this.getMaxZoom();
  }

  set maxZoom(value: number) {
    this.setMaxZoom(value);
  }

  @Input() get minZoom(): number {
    return this.getMinZoom();
  }

  set minZoom(value: number) {
    this.setMinZoom(value);
  }

  @Input() get maxResolution(): number {
    return this.getMaxResolution() ?? Number.NaN;
  }

  set maxResolution(value: number) {
    this.setMaxResolution(value);
  }

  @Input() get minResolution(): number {
    return this.getMinResolution() ?? Number.NaN;
  }

  set minResolution(value: number) {
    this.setMinResolution(value);
  }

  @Input() get visible(): boolean {
    return this.getVisible();
  }

  set visible(value: boolean | string) {
    this.setVisible(typeof value === 'string' ? value !== 'false' : value);
  }

  @Input() get opacity(): number {
    return this.getOpacity();
  }

  set opacity(value: number) {
    this.setOpacity(value);
  }

}
