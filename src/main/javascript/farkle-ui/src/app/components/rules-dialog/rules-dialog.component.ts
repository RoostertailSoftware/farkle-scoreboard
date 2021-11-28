import { Component } from '@angular/core';

import { ConfigurationService } from '@/app/shared/services';
import { RulesConfigurationClass } from '@/app/shared/classes';

@Component({
  selector: 'app-rules-dialog',
  templateUrl: './rules-dialog.component.html',
  styleUrls: ['./rules-dialog.component.scss']
})
export class RulesDialogComponent{

  configObserver:any;

  public title:string;
  public config: RulesConfigurationClass;

  doubleling: number;
  constructor( private configSvc: ConfigurationService ) {
    this.title = "Farkle Rules"
    this.configObserver = this.configSvc.getObservableData();
    this.configObserver.subscribe( result =>{
      this.config = result[0];
    });

    this.doubleling = this.config.doublingScoresOnTripples ? 2 : 1;
   }

   scoring = ( score: number, dieCount: number ): number =>{
     let rtnVal = score;
     switch( dieCount ){
       case 4:
         rtnVal = rtnVal * (2 * this.doubleling);
          break;
        case 5:
          rtnVal = rtnVal * (3 * this.doubleling);
          break;
        case 6:
          rtnVal = rtnVal * (4 * this.doubleling);
          break;
        
     }
     return rtnVal;
   }
}
