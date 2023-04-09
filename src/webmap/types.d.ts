import {Map} from "ol";

export interface ControlComponent {
  setMap(map: Map | null);
  element: HTMLElement | undefined
}
