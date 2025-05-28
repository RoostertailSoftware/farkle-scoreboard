import { Injectable } from '@angular/core';

import * as _ from "lodash";

import { BaseDataServiceClass, PlayerClass } from '@classes';

@Injectable({
  providedIn: 'root'
})
export class PlayersService extends BaseDataServiceClass< PlayerClass >{

  constructor() { 
    super();
  }

  update( op: PlayerClass ){
    let index: number = _.findIndex( this.dataStore.data, { id: op.id } );

    this.dataStore.data[ index ] =  op ;
    super.update( op );
  }
};
