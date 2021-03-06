import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { GameMasterService } from '@/app/shared/services';
import { RollActionButtonLogicClass, DiceClass } from "@classes";
import { ROLL_ACTION_BUTTON_TYPES } from "@enums";

import * as _ from "lodash";

@Component({
  selector: 'app-roll-action-buttons',
  templateUrl: './roll-action-buttons.component.html',
  styleUrls: ['./roll-action-buttons.component.scss']
})
export class RollActionButtonsComponent implements OnChanges {
  @Input() dieRemoved: boolean;

  // used by the view
  public disableObject: RollActionButtonLogicClass; 
  public rollActionButtonType: any;

  // keep current counts on current player
  public playerRollDieCount: number;
  public rollDieSelection: DiceClass;

  constructor( private gameMaster: GameMasterService ) { 
    this.reset();

    this.disableObject =        new RollActionButtonLogicClass();
    this.rollActionButtonType = ROLL_ACTION_BUTTON_TYPES;
    this.rollDieSelection =     RollActionButtonLogicClass.resetRollSelection();

    this.gameMaster.startGame();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if( !_.isUndefined( changes['dieRemoved'].currentValue ) ){
      if( changes['dieRemoved'].currentValue ){
        this.increment();
      } 
    }
  }
;

  // Roll button pushed starting a new Roll for the player;
  //
  public roll( ){
    if( this.rollDieSelection.isNewRoll( ) ){
      this.finishRoll();
    } 
    this.disableObject.selected( ROLL_ACTION_BUTTON_TYPES.ROLL );
    this.gameMaster.rollDice( this.playerRollDieCount );
  };

  // player has selected a die for counting
  //
  public die( die: ROLL_ACTION_BUTTON_TYPES ){
    this.disableObject.selected( ROLL_ACTION_BUTTON_TYPES.DIE );
    this.rollDieSelection = RollActionButtonLogicClass.setRollSelection(  this.rollDieSelection, die );

    this.gameMaster.setRollDice( this.rollDieSelection );

    this.decrement();
  };

  // Finish Roll button slected 
  public finishRoll(){
    this.disableObject.selected( ROLL_ACTION_BUTTON_TYPES.FINISH_ROLL );
    this.gameMaster.setRollDice( this.rollDieSelection );

    this.rollDieSelection =     RollActionButtonLogicClass.resetRollSelection();
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
    // if we have counted down to 0, that means all 6 die
    // have been exhausted -- :: end turn
    if( _.eq( this.playerRollDieCount, 0 ) ){
      this.finishRoll();
      this.playerRollDieCount = 6;
    }
  };
  private increment(){
    this.playerRollDieCount += 1;
  }

  // Clear the counts for a new roll or continue with current roll.
  private reset(){
    this.playerRollDieCount = 6;
    this.rollDieSelection =     RollActionButtonLogicClass.resetRollSelection();
  };

};

