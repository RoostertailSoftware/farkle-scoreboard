import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

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
    let ordinal: string = "th";
    // The teens really screw things up.  But, 4 .. 20 are all `th` so,
    // lets start with  eliminating those easy ones first, then
    // check the last number for the remaining numbers.  I have not
    // gotten into anything > 99 though
    if( _.gte( value, 4 ) && _.lte( value, 20 ) ) {
      ordinal = "th";
    } else {
      let lastCharOfStringNumber: string =  stringNumber.substring( stringNumber.length - 1 );
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
        default:
          ordinal = "th";
          break;
      };
  
    };
    return value+""+ordinal;
  };

};
