import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CurrentWeather, UserCoordinates, WeatherForecast, Location} from '../models';
import {environment} from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly token: string = environment.openWeatherApiToken;

  constructor(private readonly _httpClient: HttpClient) {
  }

  public getCoordinates(city: string): Observable<Location[]> {
    return this._httpClient.get<Location[]>(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${this.token}`);
  }

  public getForecast(coords: UserCoordinates): Observable<WeatherForecast> {
    return this._httpClient.get<WeatherForecast>(`https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${this.token}`);
  }

  public getCurrentWeather(coords: UserCoordinates): Observable<CurrentWeather> {
    return this._httpClient.get<CurrentWeather>(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${this.token}`);
  }
}
