import {GroupedForecastData} from './day-forecast.model';
import {CurrentWeather} from './current-weather.model';

export interface CombinedData {
  forecast: GroupedForecastData[];
  currentWeather: CurrentWeather;
}
