import { BehaviorSubject } from 'rxjs';

export abstract class BaseDataServiceClass< T > {

  protected dataStore: { data: T } = { data: null };
  protected _data = new BehaviorSubject< T >( null );
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
  register = ( op: T ): void => {
    this.dataStore.data = op;
    this._data.next( this.dataStore.data );
  }
}
