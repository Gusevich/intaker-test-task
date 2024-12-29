import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserCoordinates} from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserLocationService {
  private _userCoordinates: BehaviorSubject<UserCoordinates | null> = new BehaviorSubject<{
    lat: number;
    lon: number
  } | null>(null);
  public userCoordinates$: Observable<UserCoordinates | null> = this._userCoordinates.asObservable();

  public getGeolocation(): void {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition): void => {
        this._userCoordinates.next({lat: position.coords.latitude, lon: position.coords.longitude});
      },
      (error: GeolocationPositionError): void => {
        throw error;
      },
      {
        enableHighAccuracy: false,
        maximumAge: 0,
      });
  }
}
