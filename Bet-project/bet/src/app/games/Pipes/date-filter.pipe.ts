import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFilter',

})
export class DateFilterPipe implements PipeTransform {
  transform(games: any, hours?: number, selectedDayFromCalendar?: number): any {

    const selectedDataFromCalendar = new Date(selectedDayFromCalendar);
    const toDay = new Date();

    if (selectedDayFromCalendar==0){
      // selectedDataFromCalendar.getDate() == toDay.getDate() &&
      // selectedDataFromCalendar.getMonth() == toDay.getMonth() &&
      // selectedDataFromCalendar.getFullYear() == toDay.getFullYear()) {
      return games.filter((game) => {
        // console.log("gaemstart:" + game.start_time.seconds * 1000)
        // console.log("date     :" + Date.now())
        // console.log("calendar :"+ (`${selectedDayFromCalendar+86400000}`))
        return game.start_time.seconds * 1000 > Date.now() && game.start_time.seconds * 1000 < (Date.now() + hours * 3600000)

      })
    }

    else {
      return games.filter((game) => {
        return game.start_time.seconds * 1000 > selectedDayFromCalendar && game.start_time.seconds * 1000 < (selectedDayFromCalendar + 86400000)
      })
    }
  }


}






