import {Directive, Input, OnDestroy, OnInit} from '@angular/core';
import {Select} from "ol/interaction";
import {pointerMove} from "ol/events/condition";
import {StyleLike} from "ol/style/Style";
import {VectorLayerDirective} from "../layers/vector-layer.directive";
import {ObjectEvent} from "ol/Object";

@Directive({
  selector: '[hoverInteraction]'
})
export class HoverInteractionDirective implements OnInit, OnDestroy {

  #interaction?: Select;
  @Input() hoverInteraction!: StyleLike;

  constructor(private readonly layer: VectorLayerDirective<any>) { }

  private mapChanged(evt: ObjectEvent): void {
    if (evt.key === 'map') {
      evt.oldValue?.removeInteraction(this.#interaction);
      this.layer.get(evt.key)?.addInteraction(this.#interaction);
    }
  }

  ngOnInit(): void {
    this.layer.on('propertychange', this.mapChanged.bind(this));

    this.#interaction = new Select({
      layers: [this.layer],
      condition: pointerMove,
      style: this.hoverInteraction
    });
  }

  ngOnDestroy(): void {
    this.layer.un('propertychange', this.mapChanged.bind(this));
  }

}
