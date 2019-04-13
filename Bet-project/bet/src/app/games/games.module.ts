import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { XunkCalendarModule } from './xunk-calendar/xunk-calendar.module';
import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    GamesRoutingModule,
    XunkCalendarModule
  ]
})
export class GamesModule { }
