import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ForecastData} from '../../../../core/models';
import {DatePipe, DecimalPipe, JsonPipe} from '@angular/common';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {Card, CardModule} from 'primeng/card';

@Component({
  selector: 'intaker-forecast-item[forecast]',
  standalone: true,
  imports: [JsonPipe, MatCard, MatCardTitle, MatCardSubtitle, MatCardHeader, MatCardContent, MatCardActions, MatCardImage, MatButton, DatePipe, DecimalPipe, CardModule],
  templateUrl: './forecast-item.component.html',
  styleUrl: './forecast-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastItemComponent {
  @Input() forecast!: ForecastData;
}
