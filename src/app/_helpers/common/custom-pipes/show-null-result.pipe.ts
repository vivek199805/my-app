import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showNullResult'
})
export class ShowNullResultPipe implements PipeTransform {

  transform(value: any, param?: any): any {
    if ((value === '' || value === null || value === undefined) && param === undefined) {
      return '-'
    }
    if ((value === '' || value === null || value === undefined) && param === 'Boolean') {
      return '0'
    }

    return value;
  }

}
