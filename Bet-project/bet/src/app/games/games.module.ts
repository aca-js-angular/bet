/*
  Modules
  **/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesRoutingModule } from './games-routing.module';
import { XunkCalendarModule } from './xunk-calendar/xunk-calendar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
import { GameslengthsPipe } from './Pipes/gameslengths.pipe';

/*
  Directives
  **/
 import { SelectedOddDirective } from './directives/selected-odd.directive';

@NgModule({
  declarations: [
    CalendarComponent, 
    GamesComponent, 
    CategoryPipe, 
    DateFilterPipe,
    SubCategoriesFilterPipe,
    GameDetailsComponent,
    SelectedOddDirective,
    GameslengthsPipe 
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    GamesRoutingModule,
    XunkCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  exports: [CalendarComponent,GamesComponent],
})
export class GamesModule { }
