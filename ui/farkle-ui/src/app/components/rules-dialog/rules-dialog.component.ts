import { Component } from '@angular/core';

import { ConfigurationService } from '@/app/shared/services';
import { RulesConfigurationClass } from '@/app/shared/classes';
import { SCORING_TYPE } from '@/app/shared/enums';

import * as _ from "lodash";

@Component({
  selector: 'app-rules-dialog',
  templateUrl: './rules-dialog.component.html',
  styleUrls: ['./rules-dialog.component.scss']
})
export class RulesDialogComponent{

  configObserver:any;

  public title:string;
  public config: RulesConfigurationClass;
  public scoring_type_enum: any;

  doubleling: number;
  constructor( private configSvc: ConfigurationService ) {
    this.title = "Farkle Rules"
    this.configObserver = this.configSvc.getObservableData();
    this.configObserver.subscribe( result =>{
      this.config = result[0];
    });
    this.scoring_type_enum = SCORING_TYPE;
   }

   scoring = ( score: number, dieCount: number ): number =>{
     return this.config.getScoreValue( score, dieCount );
   }
}
