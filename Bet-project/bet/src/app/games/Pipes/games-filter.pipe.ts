import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'gamesFilter'
})
export class CategoryPipe implements PipeTransform {

  transform(categories: Array<any>, allGames?: any): any {
    return categories.filter((category) => {
      const arr = [];
      allGames.forEach(game => {
        if (game.category == category['id'])
          arr.push(game);
      });
      if (arr.length !== 0) return category;
    })
  }
}