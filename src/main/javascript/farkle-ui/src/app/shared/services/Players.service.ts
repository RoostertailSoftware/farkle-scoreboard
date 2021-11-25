import { Injectable } from '@angular/core';

import { BaseDataServiceClass, PlayerClass } from '@classes';

@Injectable({
  providedIn: 'root'
})
export class PlayersService extends BaseDataServiceClass< PlayerClass >{

  constructor() { 
    super();
  }
}
