import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceSelectorCalc'
})
export class PriceSelectorCalcPipe implements PipeTransform {

  transform(value: number, ...args: number[]): number {
    return value / args[0];
  }

}
