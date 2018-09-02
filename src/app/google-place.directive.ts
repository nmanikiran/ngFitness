import {
  Directive,
  ElementRef,
  OnInit,
  Output,
  EventEmitter,
  Renderer2,
  Inject,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { Address } from './profile/models/profile';
declare var google: any;
@Directive({
  selector: '[appGooglePlace]'
})
export class GooglePlaceDirective implements OnInit, AfterViewInit, OnDestroy {
  @Output()
  placeSelect: EventEmitter<any> = new EventEmitter();
  private element: HTMLInputElement;
  script: any;

  constructor(
    elRef: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: any
  ) {
    this.element = elRef.nativeElement;
  }

  getFormattedAddress(place: any) {
    const location_obj: Address = {
      formatted_address: '',
      locality: '',
      admin_area_l1: '',
      street_number: '',
      route: '',
      country: '',
      postal_code: ''
    };
    if (!place) {
      return location_obj;
    }
    // tslint:disable-next-line:forin
    for (const i in place.address_components) {
      const item = place.address_components[i];

      location_obj['formatted_address'] = place.formatted_address;
      if (item['types'].indexOf('locality') > -1) {
        location_obj['locality'] = item['long_name'];
      } else if (item['types'].indexOf('administrative_area_level_1') > -1) {
        location_obj['admin_area_l1'] = item['short_name'];
      } else if (item['types'].indexOf('street_number') > -1) {
        location_obj['street_number'] = item['short_name'];
      } else if (item['types'].indexOf('route') > -1) {
        location_obj['route'] = item['long_name'];
      } else if (item['types'].indexOf('country') > -1) {
        location_obj['country'] = item['long_name'];
      } else if (item['types'].indexOf('postal_code') > -1) {
        location_obj['postal_code'] = item['short_name'];
      }
    }
    return location_obj;
  }

  ngOnInit() {
    this.script = this.renderer.createElement('script');
    this.script.type = 'text/javascript';
    this.script.src = `https://maps.googleapis.com/maps/api/js?key=${
      environment.firebase.apiKey
    }&libraries=places&language=en`;
    this.renderer.appendChild(this.document.body, this.script);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.element);
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        this.placeSelect.emit(
          this.getFormattedAddress(autocomplete.getPlace())
        );
      });
      google.maps.event.addDomListener(
        this.element,
        'keydown',
        (e: KeyboardEvent) => {
          if (e.keyCode === 13) {
            e.preventDefault();
          }
        }
      );
    }, 3000);
  }
  ngOnDestroy() {
    this.renderer.removeChild(this.document.body, this.script);
  }
}
