import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getTypeOf'
})
export class GetTypeOfPipe implements PipeTransform {

  transform(value: any): any {
    //console.log("Pipe works ",typeof value);
    return typeof value;
  }

}
