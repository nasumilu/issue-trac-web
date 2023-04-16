import {Component, OnDestroy} from '@angular/core';
import {GeocoderService} from "../geocoder.service";
import {PopupProvider} from "../../popup/types";
import {BehaviorSubject} from "rxjs";
import {Coordinate} from "ol/coordinate";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-reverse-geocode-popup',
  templateUrl: './reverse-geocode-popup.component.html',
  styleUrls: ['./reverse-geocode-popup.component.css']
})
export class ReverseGeocodePopupComponent implements PopupProvider, OnDestroy {

  readonly #locationSub$ = new BehaviorSubject<null | any>(null);
  location$ = this.#locationSub$.asObservable();
  #coordinate?: Coordinate;
  constructor(private readonly gecodeService: GeocoderService) { }

  get title(): string {
    return 'Address (reverse-geocode)';
  }

  get coordinate(): Coordinate | undefined {
    return this.#coordinate;
  }

  set coordinate(value: Coordinate | undefined) {
    this.#coordinate = value;
    if (value ) {
      this.gecodeService.reverseGeocode(environment.geocoder, value, 'EPSG:3857')?.subscribe(address => {
        this.#locationSub$.next(address);
      });
    } else {
      this.#locationSub$.next(null);
    }
  }

  ngOnDestroy(): void {
  }


}
