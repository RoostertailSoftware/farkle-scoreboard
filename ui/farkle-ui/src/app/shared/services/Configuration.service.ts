import { Injectable } from '@angular/core';
import { BaseDataServiceClass } from '@classes';

import { RulesConfigurationClass  } from '@classes';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService extends BaseDataServiceClass< RulesConfigurationClass >{

  /**
   * @constructor To see all the private data, please look at `BaseDataServiceClass` class
   * for data and methods inherited here.
   */
  constructor() { 
    super();
    this.register ( new RulesConfigurationClass(), true );
  };
};
