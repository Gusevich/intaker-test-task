import {UserCoordinates} from './user-coordinates.model';
import {ChartData} from './chart-data.model';

export interface WeatherForecast {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastData[];
  city: CityData;
}

export interface ForecastData {
  dt: number;
  main: MainData;
  weather: WeatherCondition[];
  clouds: CloudsData;
  wind: WindData;
  visibility: number;
  dt_txt: string;
  pop: number;
  rain?: PrecipitationData;
  snow?: PrecipitationData;
  sys: SysData;
}

export interface MainData {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level?: number;
  grnd_level?: number;
  humidity: number;
  temp_kf?: number;
}

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CloudsData {
  all: number;
}

export interface WindData {
  speed: number;
  deg: number;
  gust?: number;
}

export interface PrecipitationData {
  [key: string]: number;
}

export interface SysData {
  pod: string;
}

export interface CityData {
  id: number;
  name: string;
  coord: UserCoordinates;
  country: string;
  population?: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface GroupedForecastData {
  date: string;
  forecast: ForecastData[];
  chartData: ChartData;
}
