import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFilter',

})
export class DateFilterPipe implements PipeTransform {



  transform(games: any, hours?: number, selectedDayFromCalendar?: number): any {

    const selectedDataFromCalendar = new Date(selectedDayFromCalendar);
    const toDay = new Date();

    /* console.log(
      selectedDataFromCalendar.getDate() +":"+ toDay.getDate()+ "&&"+
      selectedDataFromCalendar.getMonth()+":"+ toDay.getMonth() +"&&"+
      selectedDataFromCalendar.getFullYear()+":"+toDay.getFullYear()
    ); */
    if (
      selectedDataFromCalendar.getDate() == toDay.getDate() &&
      selectedDataFromCalendar.getMonth() == toDay.getMonth() &&
      selectedDataFromCalendar.getFullYear() == toDay.getFullYear()) {

      return games.filter((game) => {
        return game.start_time.seconds * 1000 > Date.now() && game.start_time.seconds * 1000 < (Date.now() + hours * 3600)
        
      })
    }

  else{

    return games.filter((game) => {
    
    return game.start_time.seconds * 1000 > selectedDayFromCalendar && game.start_time.seconds * 1000 < (selectedDayFromCalendar+86400000)
  })
}
}


  }







// return games.filter((game) => {
//   if (game.start_time.seconds * 1000 > Date.now() && // himaic heto
//   game.end_time.seconds * 1000 < Date.now() + addedTime*3600000   // next some hours , added time jamerov hmi in@ sftuc anverjutyuna ete sxmenq lic et vaxt added time@ klni zro ete 2 jam klni 2  i tak dalee
//   )


//     return true;
// });
