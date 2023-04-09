import { Component } from '@angular/core';
import {StyleLike} from "ol/style/Style";
import {FlatStyle} from "ol/style/flat";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'issue-trac-web';


  get geolocationStyle(): FlatStyle {
    return {
      'circle-radius': 5,
      'circle-stroke-width': 2,
      'circle-stroke-color': [51, 102, 153],
      'circle-fill-color': [51, 102, 153, 0.5]
    };
  }
}
