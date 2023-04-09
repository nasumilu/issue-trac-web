import {
  AfterContentInit, AfterViewInit,
  ContentChildren,
  Directive, Inject,
  InjectionToken,
  QueryList
} from '@angular/core';
import {Overlay, Map} from 'ol';
import {BehaviorSubject} from "rxjs";

export const MAP_OVERLAY = new InjectionToken<Overlay[]>('OverlayInjectionToken');

@Directive({
  selector: 'overlays'
})
export class OverlaysDirective {

  constructor(@Inject(MAP_OVERLAY) public readonly overlays: Overlay[]) {}

}
