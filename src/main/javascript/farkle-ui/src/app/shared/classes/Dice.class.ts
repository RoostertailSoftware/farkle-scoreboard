import { ROLL_ACTION_BUTTON_TYPES } from '@enums';

import * as _ from "lodash";

/**
 * DiceClass is part of a Player's Roll.
 * The player can select up to 6 total.
 * Player must select at least 1 dice - it must be a dice_1 or dice_5
 * all dice_x can be selected up to 6 times for a score.
 * only dice_1 and dice_5 can be selected with counts 1 .. 6
 * dice_2, dice_3, dice_4, dice_6 can be selected 2 times ONLY if 2 other pair are selected 2 times also.
 * dice_2, dice_3, dice_4, dice_6 can be selected 3 or more times
 * all dice_x can be selected 1 time if-and-only-if all are selected (straight)
 * 
 */
export class DiceClass  {
    private _die_1: number;
    public set die_1 ( d: number ) { this._die_1 = d; }
    public get die_1 ( ): number {  return this._die_1; }
    
    private _die_2: number;
    public set die_2 ( d: number ) { this._die_2 = d; }
    public get die_2 ( ): number { return this._die_2; }

    private _die_3: number;
    public set die_3 ( d: number ) { this._die_3 = d; }
    public get die_3 ( ): number { return this._die_3; }

    private _die_4: number;
    public set die_4 ( d: number ) { this._die_4 = d; }
    public get die_4 ( ): number { return this._die_4; }

    private _die_5: number;
    public set die_5 ( d: number ) { this._die_5 = d; }
    public get die_5 ( ): number { return this._die_5; }

    private _die_6: number;
    public set die_6 ( d: number ) { this._die_6 = d; }
    public get die_6 ( ): number { return this._die_6; }

    constructor(  ){ 
        this.die_1 = 0;
        this.die_2 = 0;
        this.die_3 = 0;
        this.die_4 = 0;
        this.die_5 = 0;
        this.die_6 = 0;
     };

    public select = ( die: ROLL_ACTION_BUTTON_TYPES ): void => {
        switch( die ){
            case ROLL_ACTION_BUTTON_TYPES.ONE:
                this.incrementDice( "1" );
                break;
            case ROLL_ACTION_BUTTON_TYPES.TWO:
                this.incrementDice( "2" );
                break;
            case ROLL_ACTION_BUTTON_TYPES.THREE:
                this.incrementDice( "3" );
                break;
            case ROLL_ACTION_BUTTON_TYPES.FOUR:
                this.incrementDice( "4" );
                break;
            case ROLL_ACTION_BUTTON_TYPES.FIVE:
                this.incrementDice( "5" );
                break;
            case ROLL_ACTION_BUTTON_TYPES.SIX:
                this.incrementDice( "6" );
                break;
        };
    };
    
    private incrementDice( d: string ){
        this["die_"+d ] += 1;
    };

    public isNewRoll(): boolean {
        let dieCount:number = 0
        for( let i=1; i<7; i++ ){
            dieCount += this["die_"+i ];
        }
        return _.gt( dieCount, 0 );
    }
};