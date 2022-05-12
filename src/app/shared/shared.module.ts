import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekDayToStringPipe } from './pipes/week-day-to-string.pipe';
import { MinutesToStringPipe } from './pipes/minutes-to-string.pipe';

@NgModule({
  declarations: [
    WeekDayToStringPipe,
    MinutesToStringPipe
  ],
  imports: [CommonModule],
  exports: [WeekDayToStringPipe, MinutesToStringPipe],
})
export class SharedModule { }
