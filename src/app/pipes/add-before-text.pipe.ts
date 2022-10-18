import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addBeforeText'
})
export class AddBeforeTextPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    return args[0] + value;
  }

}
