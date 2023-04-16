import {Injectable} from '@angular/core';
import {map, Observable, of, shareReplay, switchMap} from "rxjs";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserInfo} from "./types";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  readonly #account$: Observable<string>
  readonly #userinfo$: Observable<UserInfo>

  constructor(client: HttpClient) {
    this.#account$ = of(environment.services.account);

    this.#userinfo$ = this.#account$
      .pipe(
        //switchMap(() => of({uuid: 'adfadsf-adsfa', name: 'Mock User', email: 'user@mock.com', verified: true})),
        switchMap<string, any>(url => client.get(url, {params: {info: 'json'}})),
        map<any, UserInfo>(value => ({
            uuid: value.userinfo.sub,
            name: value.userinfo.name,
            email: value.userinfo.email,
            verified: value.userinfo.email_verified === 'true'
          }),
        ),
        shareReplay(5)
      );
  }

  get userinfo$(): Observable<UserInfo> {
    return this.#userinfo$;
  }

}
