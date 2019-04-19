import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './components/games/games.component';
import { XunkCalendarModule } from './xunk-calendar/xunk-calendar.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FormsModule } from '@angular/forms';
import { DatePipe } from './pipes/date.pipe';

@NgModule({
  declarations: [CalendarComponent, GamesComponent, DatePipe],
  imports: [
    CommonModule,
    GamesRoutingModule,
    XunkCalendarModule,
    FormsModule
  ],
  exports: [CalendarComponent,GamesComponent],
})
export class GamesModule { }
