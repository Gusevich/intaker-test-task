import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CustomInputComponent} from '../../shared/components/custom-input/custom-input.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {combineLatest, debounceTime, EMPTY, filter, map, Observable, switchMap} from 'rxjs';
import {ApiService, UserLocationService, WeatherService} from '../../core/services';
import {CombinedData, GroupedForecastData, Location, UserCoordinates, WeatherForecast} from '../../core/models';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {ForecastListComponent} from './components/forecast-list/forecast-list.component';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {ForecastItemComponent} from './components/forecast-item/forecast-item.component';
import {UIChart} from 'primeng/chart';
import {CurrentWeatherComponent} from './components/current-weather/current-weather.component';
import {Tabs} from 'primeng/tabs';
import {TabPanel, TabView} from 'primeng/tabview';
import {CacheService} from '../../core/services/cache.service';

@UntilDestroy()
@Component({
  selector: 'intaker-weather',
  standalone: true,
  imports: [
    CustomInputComponent,
    ReactiveFormsModule,
    FormsModule,
    AsyncPipe,
    JsonPipe,
    ForecastListComponent,
    MatTab,
    MatTabGroup,
    ForecastItemComponent,
    UIChart,
    CurrentWeatherComponent,
    Tabs,
    TabView,
    TabPanel,
  ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherComponent implements OnInit {
  public weatherData$: Observable<CombinedData> = EMPTY;

  public form: FormGroup = new FormGroup({
    cityName: new FormControl(''),
  });
  public hasSearched: boolean = false;

  constructor(private readonly _apiService: ApiService,
              private readonly _userLocationService: UserLocationService,
              private readonly _weatherService: WeatherService,
              private readonly _cdr: ChangeDetectorRef,
              private readonly _cacheService: CacheService) {
  }

  /**
   * NGRX effects could be used to handle side effects on the data, but it was not required.
   */

  public ngOnInit(): void {
    this.form.controls['cityName'].valueChanges
      .pipe(debounceTime(400), filter((value: string): boolean => value.length > 0), untilDestroyed(this))
      .subscribe((value: string): void => {
        this.hasSearched = true;
        this.searchWeather(value);
        this._cdr.markForCheck();
      });
  }

  protected searchWeather(value: string): void {
    this.weatherData$ = this._cacheService.getData(value, () =>
      this._apiService.getCoordinates(value).pipe(
        switchMap((coords: Location[]): Observable<CombinedData> =>
          coords.length
            ? combineLatest({
              forecast: this.getForecast({lat: coords[0].lat, lon: coords[0].lon}),
              currentWeather: this._apiService.getCurrentWeather({lat: coords[0].lat, lon: coords[0].lon}),
            })
            : EMPTY,
        ),
      ),
    );
  }

  protected getForecast(coords: UserCoordinates): Observable<GroupedForecastData[]> {
    return this._apiService.getForecast(coords).pipe(
      map((weatherForecast: WeatherForecast): GroupedForecastData[] =>
        this._weatherService.groupWeatherByDate(weatherForecast.list),
      ),
    );
  }
}
