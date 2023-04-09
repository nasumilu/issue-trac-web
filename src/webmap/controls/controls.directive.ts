import {
  AfterContentInit,
  AfterViewInit,
  ContentChildren,
  Directive,
  ElementRef,
  InjectionToken,
  QueryList
} from '@angular/core';
import {Map, Overlay} from "ol";
import {BehaviorSubject} from "rxjs";
import {Control} from "ol/control";
import {ControlComponent} from "../types";

export const MAP_CONTROL = new InjectionToken<ElementRef[]>('ControlInjectionToken');

@Directive({
  selector: 'controls'
})
export class ControlsDirective implements AfterContentInit {

  #map: Map|null = null;
  #mapSubject = new BehaviorSubject<Map|null>(this.#map);
  #map$ = this.#mapSubject.asObservable();

  @ContentChildren(MAP_CONTROL) readonly controlElements!: QueryList<ControlComponent>;
  #controls: Control[] = [];

  constructor() { }

  set map(value: Map|null) {
    this.#map = value;
    this.#mapSubject.next(this.#map);
  }

  get map(): Map|null {
    return this.#map;
  }

  ngAfterContentInit(): void {
    this.controlElements.forEach(component => {
      const control = new Control({element: component.element } );
      component.setMap(this.#map);
      this.#map?.addControl(control);
      this.#controls.push(control);
    });

    this.#map$.subscribe(map => {
      this.controlElements.forEach(component => component.setMap(map));
      this.#controls.forEach(control => {
        control.setMap(map);
      });
    });
  }

}
