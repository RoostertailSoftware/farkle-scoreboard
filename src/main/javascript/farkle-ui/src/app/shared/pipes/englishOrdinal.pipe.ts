import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'englishOrdinal'
})
export class englishOrdinalPipe implements PipeTransform {

  transform( value: number ): string {
    // make the number into a string
    // get the last number of that string
    // get the ordinal from that
    // return the number with the ordinal

    let stringNumber: string = ""+value;
    let lastCharOfStringNumber: string =  stringNumber.substring( stringNumber.length - 1 );

    let ordinal: string = "th";
    switch( lastCharOfStringNumber ){
      case "1":
        ordinal = "st";
        break;
      case "2":
        ordinal = "nd";
        break;
      case "3":
        ordinal = "rd";
        break;
    };

    return value+""+ordinal;
  }

}
