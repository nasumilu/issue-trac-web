import {Component, OnDestroy} from '@angular/core';
import {GeocoderService} from "../geocoder.service";
import {PopupProvider} from "../../popup/types";
import {POPUP_PROVIDER} from "../../popup/popup-overlay.directive";

@Component({
  selector: 'app-reverse-geocode-popup',
  templateUrl: './reverse-geocode-popup.component.html',
  styleUrls: ['./reverse-geocode-popup.component.css']
})
export class ReverseGeocodePopupComponent implements PopupProvider, OnDestroy {

  constructor(private readonly gecodeService: GeocoderService) { }

  get title(): string {
    return 'Address (reverse-geocode)';
  }

  ngOnDestroy(): void {
  }
}
