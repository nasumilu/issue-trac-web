import {Component, Inject, Input, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {PopupBodyDirective} from "./popup-body.directive";
import {PopupProvider} from "../types";
import {POPUP_PROVIDER} from "../popup-overlay.directive";
import {Coordinate} from "ol/coordinate";

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {

  @Input() title: string = '';
  @ViewChild(PopupBodyDirective, {read: ViewContainerRef}) contentViewContainerRef!: ViewContainerRef;

  constructor(@Inject(POPUP_PROVIDER) private readonly popupProviders: Type<PopupProvider>[]) { }

  contentFor(coordinate: Coordinate) {
    this.popupProviders.forEach(provider => {
      const content = this.contentViewContainerRef.createComponent(provider);
      content.changeDetectorRef.detectChanges();
      const element = content.instance;
      this.title = element.title;
    });
  }

  #closer?: () => void = undefined;

  set closer(value: (() => void) | undefined) {
    this.#closer = value;
  }

  get closer(): (() => void) | undefined {
    return this.#closer;
  }

  close(): void {
    if (this.#closer) {
      this.#closer();
    }
  }

  /*setContent(content: Type<PopupContent>): string {
    console.log(this.contentViewContainerRef);
    const element = this.contentViewContainerRef.createComponent(content);
    // element.changeDetectorRef.detectChanges();
    return element.instance.title;
  }*/

  clear() {
    this.contentViewContainerRef.clear();
  }

}
