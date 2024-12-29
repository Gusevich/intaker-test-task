import {Routes} from '@angular/router';
import {Routes as RoutesConstants} from './core/constants/';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: RoutesConstants.Path.weather,
      },
      {
        path: RoutesConstants.Path.weather,
        loadComponent: () =>
          import('./features/weather/weather.component').then((m) => m.WeatherComponent),
      },
      {
        path: `${RoutesConstants.Path.notFound}`,
        loadComponent: () =>
          import('./shared/components/not-found/not-found.component').then((m) => m.NotFoundComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: `${RoutesConstants.Path.notFound}`,
  },
];
