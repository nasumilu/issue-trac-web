import {Component, OnInit} from '@angular/core';
import {ControlComponent} from "../../webmap/types";
import {Map} from "ol";
import {MAP_CONTROL} from "../../webmap/controls/controls.directive";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Component({
  selector: 'account-control',
  templateUrl: './account-control.component.html',
  styleUrls: ['./account-control.component.css'],
  providers:[{provide: MAP_CONTROL, multi: true, useClass: AccountControlComponent}]

})
export class AccountControlComponent implements OnInit, ControlComponent {

  readonly account$: Observable<any>

  constructor(private readonly client: HttpClient) {
    this.account$ = this.client.get(environment.services.account);
  }

  ngOnInit(): void {
  }

  element: HTMLElement | undefined;

  setMap(map: Map | null) {

  }

}
