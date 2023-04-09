import {Feature} from "ol";
import {Coordinate} from "ol/coordinate";
import {ProjectionLike} from "ol/proj";
import {Observable} from "rxjs";

export interface NamedAdapter {
  name: string;
}

export interface GeocoderAdapter extends NamedAdapter{
  geocode(address: string): Observable<Feature<Point>[]>

}

export interface ReverseGeocoderAdapter extends NamedAdapter{
  reverseGeocode(coordinate: Coordinate, projection: ProjectionLike): Observable<any[]>;
}
