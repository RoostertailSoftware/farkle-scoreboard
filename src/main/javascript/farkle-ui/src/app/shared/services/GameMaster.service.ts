import { Injectable } from '@angular/core';

import { ConfigurationService, PlayersService } from "@services";
import { PlayerClass, RulesConfigurationClass } from "@classes";
import { ROLL_ACTION_BUTTON_TYPES } from '@enums';

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
    public startGame = ( ): boolean => {
        this.activePlayer = this.getNextPlayer( this.activePlayer );

        this.turn = this.activePlayer.getNextTurn( );
        return true;
    };

    // Player has rolled the dice
    // setup the roll within the turn
    public rollDice = ( diceCount?: number ): boolean => {
        this.roll = this.activePlayer.roll( this.turn, diceCount );
        return true;
    };

    // Player selected a die
    public diceSelection = ( d: ROLL_ACTION_BUTTON_TYPES ): number =>{
        this.activePlayer.diceSelection( this.turn, this.roll, d );
        return this.activePlayer.turnScore( this.turn, this.configuration );
    };

    // Player is done rolling and is relenquishing the turn
    // 1 - there should be some die let over 1 .. 5
    //  - there should not be 6 die but I guess there could ... if the player is an idiot
    // 2 - there is a score 50 .. *
    //  - there should be some score of the lowest to ?k
    public finishTurn = ( ): boolean => {
        this.activePlayer.finishTurn( this.turn, this.configuration );

        this.activePlayer = this.getNextPlayer( this.activePlayer );
        this.turn = this.activePlayer.getNextTurn();

        console.log( JSON.stringify( this.activePlayer ))

        return true;
    };

    // player farkled. This is the same as finishTurn with
    // 6 die and 0 score.
    public farkle = ( ): boolean => {
        this.activePlayer.farkle( this.turn, this.roll );
        this.finishTurn();
        return true;
    };

    /**
     * 
     * @returns \{ PlayerClass } the next player is selected.
     */
    private getNextPlayer = ( prev: PlayerClass ): PlayerClass => {
        let p: PlayerClass = null;
        if( this.playersList.length == 1 ){
            p = this.playersList[0]
        };
        return p;
    };
    
};
