import {Map, Overlay} from "ol";
import {Coordinate} from "ol/coordinate";

export interface PopupService {
  show(coordinate: Coordinate);
  hide();
}

export interface PopupProvider {

  title: string;
  coordinate?: Coordinate;
}


export type PopupEvent = {
  state: 'show' | 'hide';
  overlay: Overlay;
  map: Map;
}
