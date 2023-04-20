import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {LayerStyles} from "../../app/types";
import {HttpClient} from "@angular/common/http";
import {FlatStyleLike} from "ol/style/flat";

@Injectable({
  providedIn: 'root'
})
export class LayerStyleService {

  readonly #layerStyles$: Observable<LayerStyles>

  constructor(client: HttpClient) {
    this.#layerStyles$ = client.get<LayerStyles>('assets/layer-styles.json');
  }

  getStyle$(name: string): Observable<FlatStyleLike | undefined> {
    return this.#layerStyles$.pipe(
      map<LayerStyles, FlatStyleLike>(styles => styles[name] ?? undefined)
    );
  }
}
