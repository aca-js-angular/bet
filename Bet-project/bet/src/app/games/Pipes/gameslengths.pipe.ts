import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gameslengths'
})
export class GameslengthsPipe implements PipeTransform {

  transform(allgames: any, categori?: any): any {

    return allgames.filter((game) => {
      if (game.categoryName == categori.name) {
        return game;
      }
    });
  }

}