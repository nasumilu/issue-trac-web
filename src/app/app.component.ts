import {Component, OnInit} from '@angular/core';
import proj4 from 'proj4';
import {register} from "ol/proj/proj4";
import {Icon, Style} from "ol/style";
import {StyleLike} from "ol/style/Style";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'issue-trac-web';

  get issueStyle(): StyleLike {
    return new Style({
      image: new Icon({
        src: '/assets/images/geo-alt-fill.svg',
        color: "#33669999",
        anchor: [0.5, 1]
      })
    });
  }

  ngOnInit(): void {
    register(proj4);
  }
}
