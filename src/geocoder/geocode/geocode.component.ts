import {AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import {MAP_CONTROL} from "../../webmap/controls/controls.directive";
import {GeocoderService} from "../geocoder.service";
import {ControlComponent} from "../../webmap/types";
import {Collection, Feature, Map} from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

@Component({
  selector: 'geocode',
  templateUrl: './geocode.component.html',
  styleUrls: ['./geocode.component.css'],
  providers:[{provide: MAP_CONTROL, multi: true, useClass: GeocodeComponent}]
})
export class GeocodeComponent implements ControlComponent, OnInit, AfterViewInit, AfterContentInit {

  readonly #layer: VectorLayer<VectorSource>;
  readonly #featureCollection: Collection<Feature>;
  readonly #source: VectorSource;
  #map: Map |  null = null;
  @Input() adapter = 'nasumilu';

  constructor(private readonly ele: ElementRef, private readonly geocodeService: GeocoderService) {
    this.#featureCollection = new Collection<Feature>([]);
    this.#source = new VectorSource({features: this.#featureCollection});
    this.#layer = new VectorLayer<VectorSource>({
      source: this.#source,
      style: { "circle-radius": 5, "circle-stroke-width": 2, "circle-stroke-color": [51, 102, 153], "circle-fill-color": [51, 102, 153, 0.5] }
    });
  }

  get element(): HTMLElement | undefined {
    return this.ele.nativeElement;
  }

  locate(address: string) {
    this.#featureCollection.clear();
    this.geocodeService.geocode(this.adapter, address)?.subscribe(features =>
      features.forEach(feature => this.#featureCollection.push(feature))
    );
  }

  ngOnInit(): void {}

  ngAfterContentInit() {}

  ngAfterViewInit(): void {}

  setMap(map: Map | null) {
    this.#map = map;
    this.#map?.addLayer(this.#layer);
  }

}
