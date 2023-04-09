import {Inject, Injectable, InjectionToken} from '@angular/core';
import {GeocoderAdapter, ReverseGeocoderAdapter} from "./types";
import {Feature} from "ol";
import {Point} from "ol/geom";
import {Observable} from "rxjs";
import {Coordinate} from "ol/coordinate";
import {ProjectionLike} from "ol/proj";

export const GEOCODER_ADAPTERS = new InjectionToken<GeocoderAdapter[]>('GeocoderAdaptersToken');
export const REVERSE_GEOCODER_ADAPTERS = new InjectionToken<ReverseGeocoderAdapter>('ReverseGeocoderAdaptersToken');

@Injectable({ providedIn: 'root' })
export class GeocoderService {

  constructor(
    @Inject(GEOCODER_ADAPTERS) private readonly geocodeAdapters: GeocoderAdapter[],
    @Inject(REVERSE_GEOCODER_ADAPTERS) private readonly reverseGeocodeAdapters: ReverseGeocoderAdapter[]
  ) {}

  private findGeocodeAdapter(name: string): GeocoderAdapter | undefined {
    return this.geocodeAdapters.find(adapter => adapter.name === name);
  }

  private findReverseGeocodeAdapter(name: string): ReverseGeocoderAdapter | undefined {
    return this.reverseGeocodeAdapters.find(adapter => adapter.name === name);
  }

  geocode(adapter: string, address: string): Observable<Feature<Point>[]> | undefined {
      return this.findGeocodeAdapter(adapter)?.geocode(address);
  }

  reverseGeocode(adapter: string, coordinate: Coordinate, projection: ProjectionLike): Observable<Feature<Point>[]> | undefined {
    return this.findReverseGeocodeAdapter(adapter)?.reverseGeocode(coordinate, projection);
  }

}
