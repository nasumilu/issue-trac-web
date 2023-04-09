import { Directive } from '@angular/core';
import VectorSource from "ol/source/Vector";
import {LocationService} from "../location.service";
import {Feature} from "ol";
import {Point} from "ol/geom";
import {VectorLayerDirective} from "../layers/vector-layer.directive";

@Directive({
  selector: '[geolocation]'
})
export class GeolocationDirective extends VectorSource {

  public constructor(private readonly layer: VectorLayerDirective<GeolocationDirective>,
                     private readonly locationService: LocationService) {
    super({
      loader: (extent, resolution, projection, success) => {
        this.locationService.getLocation$(projection).subscribe(coordinate => {
          this.clear();
          const feature = new Feature(new Point(coordinate));
          this.addFeature(feature);
          success ? success([feature]) : null;
        });
      }
    });
    this.layer.setSource(this);
  }

}
