import {Directive, Inject, Input, OnInit} from '@angular/core';
import {Map, MapBrowserEvent} from 'ol'
import {GeocoderService} from "./geocoder.service";
import {POPUP_SERVICE} from "../popup/popup-overlay.directive";
import {PopupService} from "../popup/types";

@Directive({
  selector: '[reverseGeocode]'
})
export class ReverseGeocodeDirective implements OnInit {

  @Input() reverseGeocode?: Map;

  constructor(private readonly geocoderService: GeocoderService,
              @Inject(POPUP_SERVICE) private readonly popupService: PopupService) { }

  locate(evt: MapBrowserEvent<MouseEvent>): void {
    this.geocoderService.reverseGeocode(
      evt.coordinate,
      this.reverseGeocode?.getView().getProjection())?.subscribe(feature => {
        console.log('ReverseGeocode', feature);
        this.popupService.show(evt.coordinate);
      }
    );
  }

  ngOnInit(): void {
    this.reverseGeocode?.on('click', this.locate.bind(this));
  }

}
