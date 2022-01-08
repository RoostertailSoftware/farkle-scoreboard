import { Component } from '@angular/core';

import { AppSettingsClass, DiceClass, TurnClass } from '@classes';

import * as _ from "lodash";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title: string = AppSettingsClass.APP_NAME;
  gameStart: boolean = false;

  selectedDice: DiceClass;

  constructor( ){
  }
  beginGame( event ){
    this.gameStart = event; 
  };

  // this is where the dice was selected in <app-roll-action-buttons>
  // Set the `selectedDice` to change new data.  It is
  // then passed on to a child component
  // see the app.component.html in `<app-roll-scoreboard [die]="selectedDice">`
  dieChanged( event: DiceClass ){
    this.selectedDice = _.cloneDeep( event );
  };

}
