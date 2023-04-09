import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, skipWhile} from "rxjs";
import {Coordinate} from "ol/coordinate";
import {fromLonLat, Projection} from "ol/proj";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  #id?: number;
  readonly #locationSubject = new BehaviorSubject<GeolocationPosition|null>(null);
  readonly #location$ = this.#locationSubject.asObservable()
    .pipe(skipWhile(position => position == null)) as Observable<GeolocationPosition>;

  constructor() {
    this.#id = navigator.geolocation.watchPosition(
      position => this.#locationSubject.next(position),
    );
  }

  getLocation$(projection: Projection): Observable<Coordinate> {
    return this.#location$.pipe(
      map(position => fromLonLat([position.coords.longitude, position.coords.latitude], projection))
    );
  }
}
