import { TurnClass, StatisticsClass } from "@classes";

import { ROLL_ACTION_BUTTON_TYPES } from '@enums';

import * as _ from "lodash";

/**
 * The gameclass is the game for this player only.
 * the game has an id, and has a player_id.
 * It consists of an array of turns - which are numbered
 * from 0 .. n.
 * 
 */
export class GameClass  {

    stats: StatisticsClass;
    constructor(  ){
        this.turn = Array< TurnClass >( );
    }

    private _turn: Array< TurnClass >;
    public set turn ( t: Array< TurnClass > ){ this._turn = t; }
    public get turn( ): Array< TurnClass > { return this._turn; }

    
    // Create and add a new Turn, then set the Turn's .turn to
    // the index
    public addTurn = ( ): number => {
        let t: TurnClass = new TurnClass( );
        this.turn.push( t );
        return  _.findIndex( this.turn, { id: t.id } );
    };

    public newRoll = ( turn_index: number, diceCount: number ): number => {
            return this.turn[ turn_index ].newRoll( diceCount );
    };

    public diceSelected = ( turn_index: number, roll_index: number, die: ROLL_ACTION_BUTTON_TYPES ) => {
        return this.turn[ turn_index ].diceSelected( roll_index, die );
    };

    public getScore = ( config: any ): number => {
        let score = 0;
        _.forEach( this.turn, ( t: TurnClass, i: number )=> {
            score += this.turnScore( i, config );
        })
        return score;
    };

    public turnScore = ( turn_index: number, config: any ): number => {
        return this.turn[ turn_index ].getScore( config );
    };

    public farkle = ( turn_index: number, roll_index: number ) => {
        this.turn[ turn_index ].farkle( roll_index );
    }

};