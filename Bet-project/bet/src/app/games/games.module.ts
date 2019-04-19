import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './components/games/games.component';
import { XunkCalendarModule } from './xunk-calendar/xunk-calendar.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FormsModule } from '@angular/forms';
import { CategoryPipe } from './pipes/category.pipe';
import { DatefilterPipe } from './pipes/datefilter.pipe';

@NgModule({
  declarations: [CalendarComponent, GamesComponent, CategoryPipe, DatefilterPipe],
  imports: [
    CommonModule,
    GamesRoutingModule,
    XunkCalendarModule,
    FormsModule
  ],
  exports: [CalendarComponent,GamesComponent],
})
export class GamesModule { }
