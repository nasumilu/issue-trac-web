import {AfterContentInit, Directive, Input} from '@angular/core';
import {LocationService} from '../location.service';
import {first, tap} from 'rxjs';
import {Map} from 'ol';

@Directive({
  selector: '[currentPosition]',
})
export class CurrentPositionDirective implements AfterContentInit {

  @Input() currentPosition!: Map;
  @Input() currentPositionZoom?: number;

  constructor(private readonly locationService: LocationService) { }

  ngAfterContentInit(): void {
    const view = this.currentPosition.getView();
    this.locationService.getLocation$(view.getProjection())
      .pipe(first())
      .subscribe(coordinate => {
        view.setCenter(coordinate);
        if (this.currentPositionZoom) {
          view.setZoom(this.currentPositionZoom);
        }
      });
  }

}
