import {Injectable} from '@angular/core';
import {ChartData, ForecastData, GroupedForecastData} from '../models';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  public generateChartData(weatherData: ForecastData[]): ChartData {
    let timeLabels: string[] = weatherData.map((item: ForecastData) => item.dt_txt.split(' ')[1]);
    let temperatureData: number[] = weatherData.map((item: ForecastData) => item.main.temp);

    if (weatherData.length === 1) {
      timeLabels = [...timeLabels, timeLabels[0]];
      temperatureData = [...temperatureData, temperatureData[0]];
    }

    return {
      labels: timeLabels,
      datasets: [
        {
          label: 'Temperature (°C)',
          data: temperatureData,
          fill: false,
          borderColor: '#10b981',
          tension: 0.4,
        },
      ],
    };
  }

  public groupWeatherByDate(weatherData: ForecastData[]): GroupedForecastData[] {
    const grouped = weatherData.reduce((acc, item) => {
      const date = item.dt_txt.split(' ')[0];
      acc[date] = acc[date] || [];
      acc[date].push(item);
      return acc;
    }, {} as Record<string, ForecastData[]>);

    return Object.entries(grouped).map(([date, forecast]) => ({
      date,
      forecast,
      chartData: this.generateChartData(forecast),
    }));
  }
}
