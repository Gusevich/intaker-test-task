import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CurrentWeather} from '../../../../core/models';
import {DatePipe, DecimalPipe} from '@angular/common';
import {MatCard, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle} from '@angular/material/card';
import {Card} from 'primeng/card';

@Component({
  selector: 'intaker-current-weather[weather]',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardTitle,
    Card,
  ],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentWeatherComponent {
  @Input({required: true}) weather!: CurrentWeather;
}
