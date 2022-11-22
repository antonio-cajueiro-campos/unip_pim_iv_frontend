import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addCurrency'
})
export class AddCurrencyPipe implements PipeTransform {

  transform(value: String): String {
    if (!value.includes('R$')){
      return 'R$' + value;
    }
    return value;
  }

}
