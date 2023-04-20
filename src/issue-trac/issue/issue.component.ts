import { Component, OnInit } from '@angular/core';
import {PopupProvider} from "../../popup/types";
import {Coordinate} from "ol/coordinate";

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements PopupProvider, OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  get coordinate(): Coordinate | undefined {
    return undefined;
  }

  get title(): string {
    return '';
  }

}
