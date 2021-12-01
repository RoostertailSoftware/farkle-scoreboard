import { Component, OnInit } from '@angular/core';

import { PlayersService } from '@services';
import { PlayerClass, RollActionButtonLogicClass } from "@classes";

import { ROLL_ACTION_BUTTON_TYPES } from "@enums";

import * as _ from "lodash";



@Component({
  selector: 'app-roll-action-buttons',
  templateUrl: './roll-action-buttons.component.html',
  styleUrls: ['./roll-action-buttons.component.scss']
})
export class RollActionButtonsComponent implements OnInit {

  diceCount: number;
  playersObservable: any;
  disableObject: RollActionButtonLogicClass;
  
  rollActionButtonType: any;
  constructor( private playerSvc: PlayersService ) { 
    this.reset();
    this.playersObservable = this.playerSvc.getObservableData();
    this.playersObservable.subscribe( (result: Array< PlayerClass >) =>{
      let x:PlayerClass  = result[0];
    });

    this.disableObject = new RollActionButtonLogicClass();
    this.rollActionButtonType = ROLL_ACTION_BUTTON_TYPES;
  }

  ngOnInit(): void {
  }

  roll(){
    this.disableObject.selected( ROLL_ACTION_BUTTON_TYPES.ROLL );
  }

  farkle(){
    this.disableObject.selected( ROLL_ACTION_BUTTON_TYPES.FARKLE );
    this.reset();
  }

  finished(){
    this.disableObject.selected( ROLL_ACTION_BUTTON_TYPES.FINISH_TURN );
    this.reset();
  }
  setRollPoints(){
    this.disableObject.selected( ROLL_ACTION_BUTTON_TYPES.FINISH_ROLL );
  }
  die( die: ROLL_ACTION_BUTTON_TYPES ){
    this.disableObject.selected( ROLL_ACTION_BUTTON_TYPES.DIE ); 
    this.decrement();
  }
  decrement(){
    this.diceCount -= 1;
    this.diceCount = _.eq( this.diceCount, 0 ) ? 6 : this.diceCount;
  };
  reset(){
    this.diceCount = 6;
  }
}

