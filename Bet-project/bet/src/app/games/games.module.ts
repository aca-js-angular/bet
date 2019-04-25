/*
  Modules
  **/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesRoutingModule } from './games-routing.module';
import { XunkCalendarModule } from './xunk-calendar/xunk-calendar.module';
import { FormsModule } from '@angular/forms';

/*
  Components
  **/
import { GamesComponent } from './components/games/games.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';

/*
  Pipes
  **/
import { CategoryPipe }   from './Pipes/games-filter.pipe';
import { DateFilterPipe } from './Pipes/date-filter.pipe';
import { SubCategoriesFilterPipe } from './pipes/sub-categories-filter.pipe';
import { SelectedOddDirective } from './components/directives/selected-odd.directive';

@NgModule({
  declarations: [
    CalendarComponent, 
    GamesComponent, 
    CategoryPipe, 
    DateFilterPipe,
    SubCategoriesFilterPipe,
    GameDetailsComponent,
    SelectedOddDirective 
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    XunkCalendarModule,
    FormsModule
  ],
  exports: [CalendarComponent,GamesComponent],
})
export class GamesModule { }
