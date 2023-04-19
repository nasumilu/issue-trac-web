import JSONFeature from "ol/format/JSONFeature";
import {Issue, IssueResponse} from "../types";
import {ReadOptions} from "ol/format/Feature";
import {Feature} from "ol";
import {Projection, transform} from "ol/proj";
import {Point} from "ol/geom";
import {PROJECTIONS} from "ol/proj/epsg4326";

function isIssue(value: any): value is Issue {
  return value?.title && value?.shape;
}

export class IssueTracFeature extends JSONFeature {

  constructor() {
    super();
  }

  protected override readFeatureFromObject(object: Issue, options: ReadOptions): Feature {
    console.log('IssueTracFeature.readFeatureFromObject', object);
    return new Feature({
      geometry: new Point(transform(object.shape.coordinates, 'EPSG:4269', 'EPSG:3857')),
      title: object.title,
      description: object.description
    });
  }

  protected override readFeaturesFromObject(object: IssueResponse | Issue, options: ReadOptions): Feature[] {
    console.log('IssueTracFeature.readFeaturesFromObject', object);

    if (isIssue(object)) {
      return [this.readFeatureFromObject(object, options)];
    }
    return object._embedded.issues.map(issue => this.readFeatureFromObject(issue, options));
  }

  protected override readProjectionFromObject(object: any): Projection {
    console.log('IssueTracFeature.readProjectionFromObject', object, PROJECTIONS[0]);
    return PROJECTIONS[0];
  }

}
