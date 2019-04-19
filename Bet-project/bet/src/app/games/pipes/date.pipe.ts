import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dates'
})
export class DatePipe implements PipeTransform {

  transform(games: Array<any>, args?: any): any {
    return games.filter(game => {
      return game.start_time.seconds < Date.now();
    });
  }

}
