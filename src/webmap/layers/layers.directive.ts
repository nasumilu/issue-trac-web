import {AfterContentInit, ContentChildren, Directive, InjectionToken, Input, QueryList} from '@angular/core';
import {Layer} from 'ol/layer';

export const MAP_LAYER = new InjectionToken('LayersDirectiveToken');

@Directive({ selector: 'layers' })
export class LayersDirective implements AfterContentInit {

  @ContentChildren(MAP_LAYER) readonly layers!: QueryList<Layer>;

  constructor() { }

  ngAfterContentInit(): void { }

}
