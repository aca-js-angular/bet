import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarComponent } from './components/calendar/calendar.component';
import { GamesComponent } from './components/games/games.component';

const routes: Routes = [
  // { path: 'calendar', component: CalendarComponent },
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: GamesComponent},
  {path: 'home/:category', component: GamesComponent},
  {path: 'home/:category/:subCategory', component: GamesComponent},
  {path: 'home/:category/:subcategory/:id', component: GamesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
