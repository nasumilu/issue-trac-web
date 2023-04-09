import {Directive, InjectionToken, Input, Type, ViewContainerRef} from '@angular/core';
import {Map, Overlay} from "ol";
import {Positioning} from "ol/Overlay";
import {PopupProvider, PopupService} from "./types";
import { Coordinate } from 'ol/coordinate';
import {PopupComponent} from "./popup/popup.component";

export const POPUP_SERVICE = new InjectionToken<PopupService>('PopupServiceInjectionToken');
export const POPUP_PROVIDER = new InjectionToken<Type<PopupProvider>>('PopupProviderToken');

@Directive({
  selector: 'popup-overlay'
})
export class PopupOverlayDirective extends Overlay implements PopupService {

  #map?: Map;

  constructor(private readonly viewContainer: ViewContainerRef) {
    super({ id: PopupOverlayDirective.name });
    this.on('change:map', evt => {
      this.#map = evt.target.getMap();
      this.#map?.on('click', clickEvt => this.show(clickEvt.coordinate))
    });
  }

  show(coordinate: Coordinate) {
    this.viewContainer.clear();
    const popupRef = this.viewContainer.createComponent(PopupComponent);
    const popup = popupRef.instance;
    popup.closer = this.hide.bind(this);
    popupRef.changeDetectorRef.detectChanges();
    popup.contentFor(coordinate);

    this.setElement(popupRef.location.nativeElement);
    this.setPosition(coordinate);
  }


  hide() {
    this.setPosition(undefined);
  }

  @Input() set offset(offset: number[]) {
    this.setOffset(offset);
  }

  get offset(): number[] {
    return this.getOffset();
  }

  @Input() set positioning(positioning: Positioning) {
    this.setPositioning(positioning);
  }

  get positioning(): Positioning {
    return this.getPositioning();
  }
}
