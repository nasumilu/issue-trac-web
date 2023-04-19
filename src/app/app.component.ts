import {Component, OnInit} from '@angular/core';
import {FlatStyle} from "ol/style/flat";
import proj4 from 'proj4';
import {register} from "ol/proj/proj4";
import {Stroke, Style} from "ol/style";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'issue-trac-web';


  get geolocationStyle(): FlatStyle {
    return {
      'circle-radius': 5,
      'circle-stroke-width': 2,
      'circle-stroke-color': [51, 102, 153],
      'circle-fill-color': [51, 102, 153, 0.5]
    };
  }

  ngOnInit(): void {
    register(proj4);
  }
}
