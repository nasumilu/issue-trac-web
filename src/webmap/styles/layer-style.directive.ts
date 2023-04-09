import {AfterContentInit, Directive, ElementRef, Input} from '@angular/core';
import {VectorLayerDirective} from "../layers/vector-layer.directive";
import VectorSource from "ol/source/Vector";
import {LayerStyleService} from "./layer-style.service";
import {first} from "rxjs";

@Directive({
  selector: '[layerStyle]'
})
export class LayerStyleDirective<T extends VectorSource> implements AfterContentInit {

  @Input() layerStyle: string|undefined;

  constructor(private readonly layer: VectorLayerDirective<T>, private readonly styleService: LayerStyleService) { }

  ngAfterContentInit(): void {
    if (this.layerStyle) {
      this.styleService.getStyle$(this.layerStyle)
        .pipe(first())
        .subscribe(style => style ? this.layer.setStyle(style) : null);
    }
  }

}
