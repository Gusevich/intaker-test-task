import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ForecastData} from '../../../../core/models';
import {ForecastItemComponent} from '../forecast-item/forecast-item.component';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {CarouselModule, CarouselResponsiveOptions} from 'primeng/carousel';
import {TagModule} from 'primeng/tag';
import {Button} from 'primeng/button';
import {CAROUSEL_RESPONSIVE_OPTIONS} from '../../../../core/constants/carousel-responsive.constants';

@Component({
  selector: 'intaker-forecast-list',
  standalone: true,
  imports: [ForecastItemComponent, MatGridList, MatGridTile, CarouselModule, TagModule, Button],
  templateUrl: './forecast-list.component.html',
  styleUrl: './forecast-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastListComponent {
  @Input({required: true}) forecasts!: ForecastData[];

  public responsiveOptions: CarouselResponsiveOptions[] = CAROUSEL_RESPONSIVE_OPTIONS;
}
