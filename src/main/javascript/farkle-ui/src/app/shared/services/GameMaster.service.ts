import { Injectable } from '@angular/core';

import { ConfigurationService, PlayersService } from "@services";
import { PlayerClass, RulesConfigurationClass, DiceClass, ScoreDiceClass } from "@classes";

import * as _ from "lodash";

@Injectable({
    providedIn: 'root'
  })
export class GameMasterService {
    
    private playersObservable: any;
    private playersList: Array< PlayerClass >;
    public set players( p: Array< PlayerClass > ){ this.playersList = p; };
    public get players( ): Array< PlayerClass > { return this.playersList; };

    private _activePlayer: PlayerClass;
    private set activePlayer( p: PlayerClass ){ this._activePlayer = p; };
    private get activePlayer( ): PlayerClass { return this._activePlayer; };

    private configObservable: any;
    private config: RulesConfigurationClass;
    public set configuration( c: RulesConfigurationClass ) { this.config = c; }
    public get configuration( ): RulesConfigurationClass { return this.config; };

    private turn_index: number;
    public set turn( t: number ) { this.turn_index = t; };
    public get turn( ): number { return this.turn_index; };

    private roll_index: number;
    public set roll( r: number ) { this.roll_index = r; };
    public get roll( ): number { return this.roll_index; };

    constructor(  private configSvc: ConfigurationService, private playerSvc: PlayersService ) {
        this.playersList = new Array< PlayerClass >();
 
        this.playersObservable = this.playerSvc.getObservableData();
        this.playersObservable.subscribe( (result: Array< PlayerClass >) =>{
            this.players = result;
        });

        this.configObservable = this.configSvc.getObservableData();
        this.configObservable.subscribe( ( result:RulesConfigurationClass) =>{
            this.configuration = result[0];
        });
    };

    // Start Game button selected.
    // Get the next player, setup for next turn
    // turn.
    public startGame ( ): boolean  {
        this.activePlayer = this.getNextPlayer( this.activePlayer );
        this.playerSvc.update( this.activePlayer );

        this.turn = this.activePlayer.getNextTurn( );
        return true;
    };

    // Player has rolled the dice
    // setup the roll within the turn
    public rollDice ( diceCount?: number ): boolean  {
        this.roll = this.activePlayer.roll( this.turn, diceCount );
        this.playerSvc.update( this.activePlayer );
        return true;
    };

    /**
     * 
     * @param dice \{ DiceClass } a dice object with the selected ( 1..6 ) dice
     * @returns \{ number } calculated score;
     */
    public setRollDice ( dice: DiceClass ): number {
        this.activePlayer.setRollDice( this.turn, this.roll, dice );
        this.playerSvc.update( this.activePlayer );
        return this.activePlayer.turnScore( this.turn, this.configuration );
    };

    public getRollScore ( dice: DiceClass ): number {
        return ScoreDiceClass.getScore( dice, this.config );
    }
    // Player is done rolling and is relenquishing the turn
    // 1 - there should be some die let over 1 .. 5
    //  - there should not be 6 die but I guess there could ... if the player is an idiot
    // 2 - there is a score 50 .. *
    //  - there should be some score of the lowest to ?k
    public finishTurn ( ): boolean  {
        this.activePlayer.finishTurn( this.configuration );
        // this.playerSvc.update( this.activePlayer );

        this.activePlayer = this.getNextPlayer( this.activePlayer );
        this.playerSvc.update( this.activePlayer );

        this.turn = this.activePlayer.getNextTurn();
        console.log( JSON.stringify( this.activePlayer ) )
        return true;
    };

    // player farkled. This is the same as finishTurn with
    // 6 die and 0 score.
    public farkle ( ): boolean  {
        this.activePlayer.farkle( this.turn, this.roll );
        this.playerSvc.update( this.activePlayer );
        this.finishTurn();
        return true;
    };

    /**
     * getNextPlayer - Uses the previous and player's list to select the next
     * player and setup the turn.
     * 
     * @returns \{ PlayerClass } the next player is selected.
     */
    private getNextPlayer ( prev: PlayerClass ): PlayerClass  {
        let p: PlayerClass = null;
        let prevOrder: number = 0;
        let totalPlayers: number = this.playersList.length;

        // set inactive the previous Player if there was one.
        // and be ready for the next.
        if( !_.isUndefined( prev ) ) {
            prevOrder = prev.order;
            prev.active = false;
        };
        
        // if the prev was the last on the list, reset to the first, otherwise, well
        // go with that one.
        prevOrder = _.gt( prevOrder += 1, totalPlayers ) ? 1 : prevOrder;

        // Not sure this order is exactly indexed with the list, therefore, find this
        // player in the list and snag the index; then use that to get it from the list. 
        // set the player to active.
        let index: number = _.findIndex( this.playersList, { order: prevOrder } );
        p = this.playersList[ index ];
        p.active = true;

        return p;
    };
    
};
