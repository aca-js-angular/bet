import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './components/games/games.component';
import { XunkCalendarModule } from './xunk-calendar/xunk-calendar.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FormsModule } from '@angular/forms';
import { CategoryPipe }   from './Pipes/games-filter.pipe';
import { DateFilterPipe } from './Pipes/date-filter.pipe';
import { SubCategoriesFilterPipe } from './pipes/sub-categories-filter.pipe';


@NgModule({
  declarations: [CalendarComponent, GamesComponent, CategoryPipe, DateFilterPipe, SubCategoriesFilterPipe, ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    XunkCalendarModule,
    FormsModule
  ],
  exports: [CalendarComponent,GamesComponent],
})
export class GamesModule { }
