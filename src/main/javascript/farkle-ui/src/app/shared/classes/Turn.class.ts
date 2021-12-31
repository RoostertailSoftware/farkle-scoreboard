import { BasePlayerClass, RollClass, RulesConfigurationClass } from "@classes";

import * as _ from "lodash";
import { DiceClass } from "./Dice.class";

/**
 * A trun is part of a Player's game.  A Turn consists of
 * an array of rolls. Rolls are numbered from 0 .. n.
 * 
 * A Player's first turn must be a minimum of RulesConfigurationClass.minScoreToStart.
 */
export class TurnClass extends BasePlayerClass {

    private _turn: number;
    public set turn ( n: number ){ this._turn = n; }
    public get turn ( ): number {  return this._turn ; }

    private _score: number;
    public set score( n: number ){ this._score = n; }
    public get score ( ): number {  return this._score ; }

    private _roll: Array< RollClass >;
    public set roll ( n: Array< RollClass > ){ this._roll = n; }
    public get roll ( ): Array< RollClass > {  return this._roll ;  }

    private _farkled: boolean;
    public set farkled( b: boolean ){ this._farkled = b; };
    public get farkled() { return this._farkled; };

    private _nextRollValue: number;
    public set nextRollValue( v: number ){ this._nextRollValue = v; }
    public get nextRollValue( ): number {
        const thisRoll : number = this._nextRollValue;
        this._nextRollValue++; 
        return thisRoll 
    };

    constructor( ){
        super();
        
        this.turn = 0;
        this.score = 0;
        this.farkled = false;
        this.roll = Array< RollClass >( );

        this.nextRollValue = 1;
    };

    // Add a new Roll, and return the index.
    public newRoll = ( diceCount: number ): number => {
        let r = new RollClass( diceCount );
            r.roll = this.nextRollValue;
        this.roll.push( r );
        return _.findIndex( this.roll, { id: r.id });
    }

    // public diceSelected = (roll_index: number, die: ROLL_ACTION_BUTTON_TYPES ) => {
    //     return this.roll[ roll_index ].selectDie( die );
    // }
    public setRollDice( roll_index: number, dice: DiceClass ){
        this.roll[ roll_index ].setRollDice( dice );
    }
    public getScore = ( config: RulesConfigurationClass ): number => {
        this.score = 0;
        if( !this.farkled ){
            _.forEach( this.roll, r =>{
                this.score += r.rollScore( config );
            })
        }
        return this.score;
    };

    public farkle = (roll_index: number ) => {
        return this.farkled = this.roll[ roll_index ].farkle();
    }

};