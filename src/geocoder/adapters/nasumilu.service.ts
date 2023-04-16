import { Injectable } from '@angular/core';
import {GeocoderAdapter, ReverseGeocoderAdapter} from "../types";
import {Feature} from "ol";
import {Point} from "ol/geom";
import {Coordinate} from "ol/coordinate";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable, of, switchMap} from "rxjs";
import {ProjectionLike, transform} from "ol/proj";
import {GeoJSON} from "ol/format";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NasumiluService implements GeocoderAdapter, ReverseGeocoderAdapter {

  readonly #baseURI = environment.services.geocode
  readonly #geocoder$ = of(this.#baseURI);
  readonly #serviceProjection: ProjectionLike;
  readonly #format = new GeoJSON();

  constructor(private readonly client: HttpClient) {
    this.#serviceProjection = 'EPSG:4326';
  }

  geocode(address: string): Observable<Feature<Point>[]> {
    const params = new HttpParams({fromObject: {address}});
    return this.#geocoder$.pipe(
      switchMap(url => this.client.get(`${url}/geocode`, {responseType: 'json', params})),
      map(response => this.#format.readFeatures(response, {featureProjection: this.#serviceProjection}) as Feature<Point>[])
    );
  }

  get name(): string {
    return 'nasumilu';
  }

  reverseGeocode(coordinate: Coordinate, projection: ProjectionLike): Observable<any[]> {
    coordinate = transform(coordinate, projection, this.#serviceProjection);
    const params = new HttpParams({ fromObject: {lng: coordinate[0], lat: coordinate[1]} });
    return this.#geocoder$.pipe(
      switchMap(url => this.client.get<any[]>(`${url}/reverse-geocode`, {responseType: 'json', params}))
    );
  }
}
