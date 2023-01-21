import {Component, ElementRef, OnInit} from '@angular/core';
import {Map, View} from 'ol';
import TileLayer from "ol/layer/Tile";
import {OSM} from "ol/source";

@Component({
  selector: 'webmap',
  templateUrl: './webmap.component.html',
  styleUrls: ['./webmap.component.css']
})
export class WebmapComponent implements OnInit {

  #map!: Map;

  constructor(private readonly ele: ElementRef) { }

  ngOnInit(): void {
    this.#map = new Map({
      target: this.ele.nativeElement.querySelector('.webmap'),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    this.#map.on('click', event => console.log(event));
  }

}
