import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  Input,
} from '@angular/core';
import {ProjectionLike, transform} from "ol/proj";
import {Map, View} from "ol";
import {Coordinate} from "ol/coordinate";
import {LayersDirective} from "../layers/layers.directive";
import {OverlaysDirective} from "../overlays/overlays.directive";
import {ControlsDirective} from "../controls/controls.directive";
import {environment} from "../../environments/environment";

@Component({
  selector: 'webmap',
  templateUrl: './webmap.component.html',
  styleUrls: ['./webmap.component.css']
})
export class WebmapComponent extends Map implements AfterContentInit, AfterViewInit {

  @ContentChild('map', {read: ElementRef}) mapContainer!: ElementRef;
  @ContentChild(LayersDirective) _layers?: LayersDirective;
  @ContentChild(OverlaysDirective) _overlays?: OverlaysDirective;
  @ContentChild(ControlsDirective) _controls?: ControlsDirective;

  constructor(private readonly ele: ElementRef) {
    super({
      view: new View({
        center: environment.map.center,
        zoom: environment.map.zoom,
        projection: environment.map.projection,
        extent: environment.map?.extent ?? undefined
      })
    });
  }

  @Input() get projection() {
    return this.getView().getProjection();
  }

  set projection(value: ProjectionLike) {
    this.setView(new View({
      projection: value,
      center: this.center ? transform(this.center, this.projection, value) : undefined,
      zoom: this.zoom
    }));
  }

  @Input() get zoom(): number {
    return this.getView().getZoom() ?? Number.NaN;
  }

  set zoom(value: number) {
    this.getView().setZoom(value);
  }

  @Input() get center(){
    return this.getView().getCenter();
  }

  set center(value: Coordinate | undefined) {
    this.getView().setCenter(value);
  }

  ngAfterContentInit() {
    this._layers?.layers.forEach(layer => this.addLayer(layer));
    this._overlays?.overlays.forEach(overlay => this.addOverlay(overlay));
    if (this._controls) {
      this._controls.map = this;
    }
  }

  ngAfterViewInit(): void {
    this.setTarget(this.ele.nativeElement);
  }

}
