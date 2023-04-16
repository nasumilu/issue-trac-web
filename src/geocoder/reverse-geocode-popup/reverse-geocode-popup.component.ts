import {Component, OnDestroy} from '@angular/core';
import {GeocoderService} from "../geocoder.service";
import {PopupProvider} from "../../popup/types";
import {BehaviorSubject, catchError, of} from "rxjs";
import {Coordinate} from "ol/coordinate";
import {environment} from "../../environments/environment";
import {HttpParams} from "@angular/common/http";
import {Feature} from "ol";
import {Point} from "ol/geom";

@Component({
  selector: 'app-reverse-geocode-popup',
  templateUrl: './reverse-geocode-popup.component.html',
  styleUrls: ['./reverse-geocode-popup.component.css']
})
export class ReverseGeocodePopupComponent implements PopupProvider, OnDestroy {

  readonly #locationSub$ = new BehaviorSubject<null | {error?: string, address: string, coordinate: Coordinate}>(null);
  readonly location$ = this.#locationSub$.asObservable();

  #coordinate?: Coordinate;

  constructor(private readonly gecodeService: GeocoderService) {
  }

  get title(): string {
    return 'Address (reverse-geocode)';
  }

  get coordinate(): Coordinate | undefined {
    return this.#coordinate;
  }

  set coordinate(value: Coordinate | undefined) {
    this.#coordinate = value;
    if (value) {
      this.gecodeService.reverseGeocode(value, 'EPSG:3857')
        .pipe(
          catchError(() => {
              // redirect to log in
              const params = new HttpParams({
                fromObject: {
                  iss: environment.account.iss,
                  target_link_uri: `${window.location.origin}${window.location.pathname}`
                }
              });
              const feature = new Feature<Point>({
                error: `${environment.services.account}?${params.toString()}`
              });
            return of(feature)
          }),)
        .subscribe(feature => {
          const error = feature?.getProperties()['error'] ?? undefined;
          const coordinate = feature?.getGeometry()?.getCoordinates() ?? [];
          const address = feature?.getProperties()['address'] ?? '';
          this.#locationSub$.next({error, coordinate, address});
        });
    } else {
      this.#locationSub$.next(null);
    }
  }

  ngOnDestroy(): void {
  }


}
