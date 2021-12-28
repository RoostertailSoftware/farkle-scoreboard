import { BehaviorSubject, observeOn } from 'rxjs';

import * as _ from "lodash";
import { PlayerClass } from '.';

export abstract class BaseDataServiceClass< T > {

  protected dataStore: { data: Array< T > } = { data: [] };
  protected _data = new BehaviorSubject< Array< T > >( [] );
  readonly data = this._data.asObservable();

  constructor() { }

  /**
   * 
   * @returns An Observable.
   * @example
   * let x: any = this.svc.getObservableData();
   * x.subscribe( result => {} );
   */
  getObservableData = (): any => {
    return this.data;
  };

  /**
   * This will register new data into the observable
   * and send out that to all subscribers.
   * @param op 
   * @example
   * this.svc.register( data: T );
   */
  register( op: T, singular?: boolean ): void {
    if( singular ){
      this.dataStore.data =   [ op ] ;
    } else {
      this.dataStore.data.push(  op )
    }
    this._data.next( this.dataStore.data );
  };

  update( op: T ): void {
    this._data.next( this.dataStore.data );
  };
  

}