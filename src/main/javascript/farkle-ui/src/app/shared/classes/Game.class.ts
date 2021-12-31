import { TurnClass, DiceClass, RulesConfigurationClass } from "@classes";

import * as _ from "lodash";

/**
 * The gameclass is the game for this player only.
 * the game has an id, and has a player_id.
 * It consists of an array of turns - which are numbered
 * from 0 .. n.
 * 
 */
export class GameClass  {

    private _turn: Array< TurnClass >;
    public set turn ( t: Array< TurnClass > ){ this._turn = t; }
    public get turn( ): Array< TurnClass > { return this._turn; }

    private _nextTurnValue: number;
    public set nextTurnValue( v: number ){ this._nextTurnValue = v; }
    public get nextTurnValue( ): number {
        const thisTurn : number = this._nextTurnValue;
        this._nextTurnValue++; 
        return thisTurn 
    };

    constructor(  ){
        this.turn = Array< TurnClass >( );
        this.nextTurnValue = 1;
    }

    // Create and add a new Turn, then set the Turn's .turn to
    // the index
    public addTurn( ): number {
        let t: TurnClass = new TurnClass( );
            t.turn = this.nextTurnValue;
        this.turn.push( t );
        return _.findIndex( this.turn, { id: t.id } );
    };

    /**
     * newRoll - create a new roll for this turn.
     * @param turn_index \{ number } the turn number for the player
     * @param diceCount \{ number } the number of dice this roll is allowed
     * @returns \{ number } the roll index
     */
    public newRoll ( turn_index: number, diceCount: number ): number {
        return this.turn[ turn_index ].newRoll( diceCount );
    };

    /**
     * setRollDice - 
     * Set the  Dice Object into the roll for this turn
     * @param turn_index \{ number } the turn number for the player
     * @param roll_index  \{ number } the roll number for the turn
     * @param dice \{ DiceClass } the dice for the turn.
     */
    public setRollDice( turn_index: number, roll_index: number, dice: DiceClass ): void {
        this.turn[ turn_index ].setRollDice( roll_index, dice );
    }

    /**
     * getScore - go thru the turns and get the current score for the game.
     * @param config \{ Config }
     * @returns 
     */
    public getScore ( config: RulesConfigurationClass ): number {
        let score = 0;
        _.forEach( this.turn, ( t: TurnClass, i: number )=> {
            score += this.turnScore( i, config );
        });
        return score;
    };

    public turnScore ( turn_index: number, config: RulesConfigurationClass ): number  {
        return this.turn[ turn_index ].getScore( config );
    };

    public farkle ( turn_index: number, roll_index: number )  {
        this.turn[ turn_index ].farkle( roll_index );
    };

    private getNextTurnValue(){

    }
};