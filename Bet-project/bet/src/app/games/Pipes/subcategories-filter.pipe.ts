import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subcategoriesFilter'
})
export class SubcategoriesFilterPipe implements PipeTransform {

  transform(subcategories: any, allGames?: any, categories? : any): any {
    

    return subcategories.filter((subcategori) => {
      const arr = [];
      allGames.forEach((game) => {
        if (game.subCategoryName == subcategori.name && (subcategori.id == categories || categories == "") ){  //
       
          arr.push(game)}
      })
      if (arr.length !== 0) return subcategori.name;
    });
  }

}



