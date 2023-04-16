import {Inject, Injectable, InjectionToken} from '@angular/core';
import {GeocoderAdapter, ReverseGeocoderAdapter} from "./types";
import {Feature} from "ol";
import {Point} from "ol/geom";
import {Observable, switchMap} from "rxjs";
import {Coordinate} from "ol/coordinate";
import {ProjectionLike} from "ol/proj";
import {AccountService} from "../accounts/account.service";
import {environment} from "../environments/environment";

const NAME = 'issue-trac';
export const GEOCODER_ADAPTERS = new InjectionToken<GeocoderAdapter[]>('GeocoderAdaptersToken');
export const REVERSE_GEOCODER_ADAPTERS = new InjectionToken<ReverseGeocoderAdapter>('ReverseGeocoderAdaptersToken');

@Injectable({providedIn: 'root'})
export class GeocoderService implements GeocoderAdapter, ReverseGeocoderAdapter {

  constructor(
    @Inject(GEOCODER_ADAPTERS) private readonly geocodeAdapters: GeocoderAdapter[],
    @Inject(REVERSE_GEOCODER_ADAPTERS) private readonly reverseGeocodeAdapters: ReverseGeocoderAdapter[],
    private readonly accountService: AccountService
  ) {
  }

  get name(): string {
    return NAME;
  }

  private getConfiguredAdapter(type: 'geocode' | 'reverse'): string {
    if (typeof environment.geocoder === 'string') {
      return environment.geocoder;
    }
    return environment.geocoder[type];
  }

  private findGeocodeAdapter(): GeocoderAdapter {
    const name = this.getConfiguredAdapter('geocode');
    const adapter = this.geocodeAdapters.find(adapter => adapter.name === name);
    if (!adapter) {
      throw new Error(`Unable to find adapter ${name}!`);
    }
    return adapter;
  }

  private findReverseGeocodeAdapter(): ReverseGeocoderAdapter {
    const name = this.getConfiguredAdapter('reverse');
    const adapter = this.reverseGeocodeAdapters.find(adapter => adapter.name === name);
    if (!adapter) {
      throw new Error(`Unable to find adapter ${name}!`);
    }
    return adapter
  }

  geocode(address: string): Observable<Feature<Point>[]> {
    return this.accountService.userinfo$.pipe(
      switchMap(() => this.findGeocodeAdapter().geocode(address))
    );
  }

  reverseGeocode(coordinate: Coordinate, projection: ProjectionLike): Observable<Feature<Point>> {
    return this.accountService.userinfo$.pipe(
      switchMap(() => this.findReverseGeocodeAdapter().reverseGeocode(coordinate, projection))
    );
  }

}
