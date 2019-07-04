import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './page404/page404.component';
import { GamesComponent } from './games/components/games/games.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: GamesComponent},
  {path: 'home/:category', component: GamesComponent},
  {path: 'home/:category/:subCategory', component: GamesComponent},
  {path: 'home/:category/:subcategory/:id', component: GamesComponent},
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
