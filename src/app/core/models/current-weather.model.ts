import {UserCoordinates} from './user-coordinates.model';
import {CloudsData, PrecipitationData, WeatherCondition, WindData} from './day-forecast.model';

export interface CurrentWeather {
  coord: UserCoordinates;
  weather: WeatherCondition[];
  base: string;
  main: CurrentMainData;
  visibility: number;
  wind: WindData;
  rain?: PrecipitationData;
  snow?: PrecipitationData;
  clouds: CloudsData;
  dt: number;
  sys: CurrentSysData;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface CurrentMainData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface CurrentSysData {
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
  type: number;
}
