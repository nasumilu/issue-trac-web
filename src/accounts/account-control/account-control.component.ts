import {Component, OnInit} from '@angular/core';
import {ControlComponent} from "../../webmap/types";
import {Map} from "ol";
import {MAP_CONTROL} from "../../webmap/controls/controls.directive";
import {Observable} from "rxjs";
import {AccountService} from "../account.service";
import {UserInfo} from "../types";

@Component({
  selector: 'account-control',
  templateUrl: './account-control.component.html',
  styleUrls: ['./account-control.component.css'],
  providers:[{provide: MAP_CONTROL, multi: true, useClass: AccountControlComponent}]

})
export class AccountControlComponent implements OnInit, ControlComponent {

  constructor(private readonly accountService: AccountService) { }

  ngOnInit(): void {
  }

  get userinfo$(): Observable<UserInfo> {
    return this.accountService.userinfo$;
  }

  element: HTMLElement | undefined;

  setMap(map: Map | null) {

  }

}
