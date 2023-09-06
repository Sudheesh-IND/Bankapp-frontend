import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  

  transform(transactions:any[],searchTerm:String,propName:any): any[] {

    const result:any[]=[]
    

    if(!transactions ||searchTerm==''||propName==''){
      return transactions
    }

    transactions.forEach((trans:any)=>{
      if(trans[propName].trim().toLowerCase().includes(searchTerm.trim().toLowerCase())){
            result.push(trans)
      }
    })

    return  result
  }

}
