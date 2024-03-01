import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getIndex'
})
export class GetIndexPipe implements PipeTransform {

  transform(val: number): number {
  //console.log('In Pipe ....');
    return val + 1;
  }

}
