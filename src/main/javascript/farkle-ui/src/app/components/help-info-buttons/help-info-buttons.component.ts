import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { RulesConfigurationClass } from "@classes";
import { RulesConfigurationDialogComponent, RulesDialogComponent, AboutDialogComponent } from '@components';
import { ConfigurationService } from "@services";
import * as _ from 'lodash';

@Component({
  selector: 'app-help-info-buttons',
  templateUrl: './help-info-buttons.component.html',
  styleUrls: ['./help-info-buttons.component.scss']
})
export class HelpInfoButtonsComponent {

  tooltip: any;
  configData: RulesConfigurationClass;
  constructor( private configSvc: ConfigurationService, 
      private configDialog: MatDialog, 
      private rulesDialog: MatDialog, 
      private aboutDialog: MatDialog ) {

    this.tooltip = {
      rules: { tip: "basic Farkel rules" },
      about: { tip: "about Farkle scoreboard" },
      config: { tip: "configure Farkel game rules" }
    };

    let x = this.configSvc.getObservableData();
    x.subscribe( result => {
      this.configData = result[0];
    })
   }

  about = () =>{
    this.aboutDialog.open( AboutDialogComponent );
   }

  config = () =>{ 
    let data = {
      data: this.configData
    }
    let x = this.configDialog.open( RulesConfigurationDialogComponent, data );
    x.afterClosed().subscribe( result => {
      if( !_.isEmpty( result ) ) {
        this.configSvc.register( new RulesConfigurationClass ( result ), true )
      }
    })
  }

  rules = () => {
    let x = this.rulesDialog.open( RulesDialogComponent );
  }

}
