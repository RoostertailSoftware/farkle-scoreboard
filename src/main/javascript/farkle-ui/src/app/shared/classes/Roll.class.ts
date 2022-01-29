import { BasePlayerClass, DiceClass, ScoreDiceClass, RulesConfigurationClass } from "@classes";

/**
 * A roll is a part of a Player's roll.
 * Since this game does not actually roll dice, the attribute diceRoll is not going to be used
 * at this time (maybe later)
 * 
 * The roll consists of the dice the player selects to keep for his score.
 * the diceSelection is a diceClass.
 */
export class RollClass extends BasePlayerClass {

    private _roll: number;
    public set roll ( n: number ){ this._roll = n; }
    public get roll ( ): number {  return this._roll ; }

    private _active: boolean;
    public set active ( n: boolean ){ this._active = n; }
    public get active ( ): boolean {  return this._active ; }

    private _score: number;
    public set score ( n: number ){ this._score = n; }
    public get score ( ): number {  return this._score ; }

    /**
     * How many die this roll was allowed to roll (1 ... 6)
     */
    private _rolledDiceCount: number;
    public set rolledDiceCount ( n: number ){ this._rolledDiceCount = n; }
    public get rolledDiceCount ( ): number {  return this._rolledDiceCount ; }

    // a DiceClass of the selected die for the roll. Whihc, duh, makes up the 
    // score
    private _diceSelection: DiceClass;
    public set diceSelection ( d: DiceClass ){ this._diceSelection = d; }
    public get diceSelection ( ): DiceClass { return this._diceSelection ; }

    private _farkled: boolean;
    public set farkled( b: boolean ){ this._farkled = b; };
    public get farkled() { return this._farkled; };

    constructor( rolledDiceCount: number ){
        super();

        this.roll =             0;
        this.active =           false;          
        this.score =            0;
        this.farkled =          false;
        this.rolledDiceCount =  rolledDiceCount;
        this.diceSelection =    new DiceClass( );
    }; 


    public setRollDice( dice: DiceClass ){
        this.diceSelection = dice;
    }

    public rollScore( config: RulesConfigurationClass ): number {
        return this.score = ScoreDiceClass.getScore( this.diceSelection, config );
    };

    public farkle( ): boolean {
        return this.farkled = true;
    };
    
}