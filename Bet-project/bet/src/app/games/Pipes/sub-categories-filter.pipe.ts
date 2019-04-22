import { Pipe, PipeTransform } from '@angular/core';

import { Game } from '../interfaces/game';

@Pipe({
  name: 'subCategoriesFilter'
})
export class SubCategoriesFilterPipe implements PipeTransform {

  transform(filteredSubCategories: Array<string>, allGames?: any): any {
    
    return filteredSubCategories.filter(subCat => {
      const arr = [];
      allGames.forEach(game => {

        if (game.subCategoryName === subCat) {
          arr.push(game);
        }

      })
      if(arr.length !== 0) return subCat;
    });
  }

}
