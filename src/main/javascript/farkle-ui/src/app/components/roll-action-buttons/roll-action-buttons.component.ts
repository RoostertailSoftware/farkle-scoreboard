import { Component } from '@angular/core';

import { GameMasterService } from '@/app/shared/services';
import { RollActionButtonLogicClass, DiceClass } from "@classes";
import { ROLL_ACTION_BUTTON_TYPES } from "@enums";

import * as _ from "lodash";

@Component({
  selector: 'app-roll-action-buttons',
  templateUrl: './roll-action-buttons.component.html',
  styleUrls: ['./roll-action-buttons.component.scss']
})
export class RollActionButtonsComponent {

  // used by the view
  public disableObject: RollActionButtonLogicClass; 
  public rollActionButtonType: any;

  public playerRollScore: number;

  // keep current counts on current player
  public playerRollDieCount: number;
  public rollDieSelection: DiceClass;

  constructor( private gameMaster: GameMasterService ) { 
    this.reset();

    this.playerRollScore =      0;
    this.disableObject =        new RollActionButtonLogicClass();
    this.rollActionButtonType = ROLL_ACTION_BUTTON_TYPES;
    this.rollDieSelection =     RollActionButtonLogicClass.resetRollSelection();

    this.gameMaster.startGame();
  };

  // Roll button pushed starting a new Roll for the player;
  //
  public roll( ){
    this.disableObject.selected( ROLL_ACTION_BUTTON_TYPES.ROLL );
    this.gameMaster.rollDice( this.playerRollDieCount );
  };

  // player has selected a die for counting
  //
  public die( die: ROLL_ACTION_BUTTON_TYPES ){
    this.disableObject.selected( ROLL_ACTION_BUTTON_TYPES.DIE );
    this.rollDieSelection = RollActionButtonLogicClass.setRollSelection(  this.rollDieSelection, die );
    this.playerRollScore = this.gameMaster.getRollScore( this.rollDieSelection );
    // this.gameMaster.diceSelection( die );
    this.decrement();
  };

  // Finish Roll button slected 
  public finishRoll(){
    this.disableObject.selected( ROLL_ACTION_BUTTON_TYPES.FINISH_ROLL );
    this.playerRollScore = this.gameMaster.setRollDice( this.rollDieSelection );
    this.resetDieSelection();
  };

  // Finished Turn button has been selected.
  // be done with this player and get the next, set up a new turn
  //
  public finishTurn(){
    this.disableObject.selected( ROLL_ACTION_BUTTON_TYPES.FINISH_TURN );
    this.gameMaster.finishTurn( );
    this.reset();
  };

  // Bummer, player rolled the die and came up lacking
  //
  public farkle(){
    this.disableObject.selected( ROLL_ACTION_BUTTON_TYPES.FARKLE );
    this.gameMaster.farkle();
    this.reset();
  };

  // keeing a running total of die
  //
  private decrement(){
    this.playerRollDieCount -= 1;
    this.playerRollDieCount = _.eq( this.playerRollDieCount, 0 ) ? 6 : this.playerRollDieCount;
  };

  // Clear the counts for a new roll or continue with current roll.
  private reset(){
    this.playerRollDieCount = 6;
    this.playerRollScore =    0;
    this.resetDieSelection();
  };

  // Reset the roll dice and clear the score;
  public resetDieSelection(){
    this.rollDieSelection = RollActionButtonLogicClass.resetRollSelection();
    this.playerRollScore = this.gameMaster.getRollScore( this.rollDieSelection );
  };

};

