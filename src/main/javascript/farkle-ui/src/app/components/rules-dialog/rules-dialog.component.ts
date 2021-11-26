import { Component, OnInit } from '@angular/core';

import { ConfigurationService } from '@/app/shared/services';
import { RulesConfigurationClass } from '@/app/shared/classes';

@Component({
  selector: 'app-rules-dialog',
  templateUrl: './rules-dialog.component.html',
  styleUrls: ['./rules-dialog.component.scss']
})
export class RulesDialogComponent implements OnInit {

  configObserver:any;

  public title:string;
  public config: RulesConfigurationClass;

  constructor( private configSvc: ConfigurationService ) {
    this.title = "Farkle Rules"

    this.configObserver = this.configSvc.getObservableData();
    this.configObserver.subscribe( result =>{
      this.config = result[0];
    })
   }

  ngOnInit(): void {
  }

}
