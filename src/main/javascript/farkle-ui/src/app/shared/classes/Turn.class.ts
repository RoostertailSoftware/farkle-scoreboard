import { BasePlayerClass, RollClass } from "@classes";
import { ROLL_ACTION_BUTTON_TYPES } from '@enums';

import * as _ from "lodash";

/**
 * A trun is part of a Player's game.  A Turn consists of
 * an array of rolls. Rolls are numbered from 0 .. n.
 * 
 * A Player's first turn must be a minimum of RulesConfigurationClass.minScoreToStart.
 */
export class TurnClass extends BasePlayerClass{

    constructor( ){
        super()
        this.turn = 0;
        this.score = 0;
        this.farkled = false;
        this.roll = Array< RollClass >( );
    }

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

    public newRoll = ( diceCount: number ): number => {
        let r = new RollClass( diceCount );
        this.roll.push( r );
        r.roll = _.findIndex( this.roll, { id: r.id });
        return r.roll;
    }
    public diceSelected = (roll_index: number, die: ROLL_ACTION_BUTTON_TYPES ) => {
        return this.roll[ roll_index ].selectDie( die );
    }

    public getScore = ( config: any ): number => {
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