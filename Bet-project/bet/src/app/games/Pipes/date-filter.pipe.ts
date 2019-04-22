import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFilter',
  
})
export class DateFilterPipe implements PipeTransform {

 

transform(games: any, availableGames ?: string ): any {


  const liveGames = games.filter(game => game.start_time.seconds * 1000 < Date.now() && Date.now() < game.end_time.seconds * 1000);
  const upcomingGames = games.filter(game =>game.start_time.seconds * 1000 > Date.now())

  if(availableGames == "upcomingGames") return upcomingGames;
  if(availableGames == "liveGames") return liveGames;

}



}

  




// return games.filter((game) => {
//   if (game.start_time.seconds * 1000 > Date.now() && // himaic heto
//   game.end_time.seconds * 1000 < Date.now() + addedTime*3600000   // next some hours , added time jamerov hmi in@ sftuc anverjutyuna ete sxmenq lic et vaxt added time@ klni zro ete 2 jam klni 2  i tak dalee
//   )


//     return true;
// });
