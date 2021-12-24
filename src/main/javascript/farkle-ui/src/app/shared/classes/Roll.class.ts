import { BasePlayerClass, DiceClass, ScoreDiceClass } from "@classes";
import { ROLL_ACTION_BUTTON_TYPES } from '@enums';

/**
 * A roll is a part of a Player's roll.
 * Since this game does not actually roll dice, the attribute diceRoll is not going to be used
 * at this time (maybe later)
 * 
 * The roll consists of the dice the player selects to keep for his score.
 * the diceSelection is a diceClass.
 */
export class RollClass extends BasePlayerClass {

    constructor( rolledDiceCount: number, selectionArray?:Array< number > ){
        super();
        this.roll = 0;
        this.rolledDiceCount = rolledDiceCount;
        this.diceSelection =    new DiceClass( selectionArray );
    }
    private _roll: number;
    public set roll ( n: number ){ this._roll = n; }
    public get roll ( ): number {  return this._roll ; }

    private _rolledDiceCount: number;
    public set rolledDiceCount ( n: number ){ this._rolledDiceCount = n; }
    public get rolledDiceCount ( ): number {  return this._rolledDiceCount ; }

    private _diceSelection: DiceClass;
    public set diceSelection ( d: DiceClass ){ this._diceSelection = d; }
    public get diceSelection ( ): DiceClass { return this._diceSelection ; }

    public selectDie = ( die: ROLL_ACTION_BUTTON_TYPES ) => {
        return this.diceSelection.select( die );
    };

    public rollScore = ( config: any ): number => {
        return ScoreDiceClass.getScore( this.diceSelection, config );
    };

}