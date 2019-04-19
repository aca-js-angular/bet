import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datefilter'
})
export class DatefilterPipe implements PipeTransform {

  transform(games: any, args?: any): any {
    return games.filter((game)=>{

      console.log(game.start_time.seconds + ":" + Date.now())
      return game.start_time.seconds *1000 < Date.now();
    });
  }

}
