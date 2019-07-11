import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysAgo'
})
export class DaysAgoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // return null;

    let now = new Date();
    let oneDay = 24 * 60 * 60 * 1000;
    let diffDays = Math.round(Math.abs((value.getTime() - now.getTime()) / (oneDay)));

    return diffDays;
  }

}
