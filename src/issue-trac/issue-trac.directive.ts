import { Directive } from '@angular/core';
import VectorSource from "ol/source/Vector";
import {VectorLayerDirective} from "../webmap/layers/vector-layer.directive";
import {Extent} from "ol/extent";
import {IssueTracFeature} from "./lib/format";
import {bbox} from "ol/loadingstrategy";
import {environment} from "../environments/environment";

@Directive({
  selector: '[issue-trac-source]'
})
export class IssueTracDirective extends VectorSource {

  constructor(private readonly layer: VectorLayerDirective<IssueTracDirective>) {
    super({
      url: (extent: Extent) => {
        const query = ['xmax', 'ymax', 'xmin', 'ymin']
          .map((param, index) => `${param}=${extent[index]}`)
          .join('&');

        return `${environment.services.issues.feature}?${query}&srid=${environment.map.projection.split(':')[1]}`;
      },
      attributions: '&copy <a href="https://nasumilu.io/issue-trac">nasumilu.com</a>',
      format: new IssueTracFeature(),
      strategy: bbox
    });
    layer.setSource(this);
  }

}
