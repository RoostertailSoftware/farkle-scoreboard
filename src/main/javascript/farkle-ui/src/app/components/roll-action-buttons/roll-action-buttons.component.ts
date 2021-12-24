import { Component } from '@angular/core';

import { GameMasterService } from '@/app/shared/services';
import { RollActionButtonLogicClass } from "@classes";
import { ROLL_ACTION_BUTTON_TYPES } from "@enums";

import * as _ from "lodash";

@Component({
  selector: 'app-roll-action-buttons',
  templateUrl: './roll-action-buttons.component.html',
  styleUrls: ['./roll-action-buttons.component.scss']
})
export class RollActionButtonsComponent {

  // used by the view
  disableObject: RollActionButtonLogicClass; 
  rollActionButtonType: any; 


  // keep current counts on current player
  playerTurnNumber:   number;
  playerTurnScore:    number;
  playerRollNumber:   number;
  playerRollDieCount: number;

  constructor( private gameMaster: GameMasterService ) { 
    this.playerTurnScore = 0;
    this.reset();

    this.disableObject = new RollActionButtonLogicClass();
    this.rollActionButtonType = ROLL_ACTION_BUTTON_TYPES;

    this.gameMaster.startGame();
  };

  // Roll button pushed starting a new Roll for the player;
  //
  roll( ){
    this.disableObject.selected( ROLL_ACTION_BUTTON_TYPES.ROLL );
    this.gameMaster.rollDice( this.playerRollDieCount );
  };

  // player has selected a die for counting
  //
  die( die: ROLL_ACTION_BUTTON_TYPES ){
    this.disableObject.selected( ROLL_ACTION_BUTTON_TYPES.DIE ); 
    this.playerTurnScore = this.gameMaster.diceSelection( die );
    this.decrement();
  };

  // Finish Roll button slected 
  finishRoll(){
    this.disableObject.selected( ROLL_ACTION_BUTTON_TYPES.FINISH_ROLL );
  };

  // Finished Turn button has been selected.
  // be done with this player and get the next, set up a new turn
  //
  finishTurn(){
    this.disableObject.selected( ROLL_ACTION_BUTTON_TYPES.FINISH_TURN );
    this.gameMaster.finishTurn( );
    this.reset();
  };


  // Bummer, player rolled the die and came up lacking
  //
  farkle(){
    this.disableObject.selected( ROLL_ACTION_BUTTON_TYPES.FARKLE );
    this.gameMaster.farkle();
    this.reset();
  };

  // keeing a running total of die
  //
  decrement(){
    this.playerRollDieCount -= 1;
    this.playerRollDieCount = _.eq( this.playerRollDieCount, 0 ) ? 6 : this.playerRollDieCount;
  };
  reset(){
    this.playerTurnScore = 0;
    this.playerRollDieCount = 6;
  };

}

