import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'SearchFilter'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, ...args: any): any {
    if(!value)return null;
    if(!args)return value;
    args = args.map((a: string) => a.toLowerCase());
    let val =  value.filter((item : string) => JSON.stringify(item).toLowerCase().includes(args));
    return val.length ? val : ['noResult'];
  }

}
