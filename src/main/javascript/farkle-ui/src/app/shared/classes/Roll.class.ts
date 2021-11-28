import { DiceClass } from "@classes";

import { BasePlayerClass } from "@classes";

/**
 * A roll is a part of a Player's turn.
 * Since this game does not actually roll dice, the attribute diceRoll is not going to be used
 * at this time (maybe later)
 * 
 * The roll consists of the dice the player selects to keep for his score.
 * the diceSelection is a diceClass.
 */
export class RollClass extends BasePlayerClass {

    constructor( player_id: string, turn_id: string ){
        super();
        this.player_id = player_id;
        this.turn_id = turn_id;

        this.diceRoll =         new DiceClass( this.player_id, this.turn_id, this.id )
        this.diceSelection =    new DiceClass( this.player_id, this.turn_id, this.id );
    }

    private _player_id: string;
    public set player_id ( id: string ){
        this._player_id = id;
    }
    public get player_id ( ): string {
        return this._player_id ;
    }
    private _turn_id: string;
    public set turn_id( s: string ){
        this._turn_id = s;
    }
    public get turn_id(): string {
        return this._turn_id;
    }

    private _diceRoll: DiceClass;
    public set diceRoll ( d: DiceClass ){
        this._diceRoll = d;
    }
    public get diceRoll ( ): DiceClass {
        return this._diceRoll ;
    }

    private _diceSelection: DiceClass;
    public set diceSelection ( d: DiceClass ){
        this._diceSelection = d;
    }
    public get diceSelection ( ): DiceClass {
        return this._diceSelection ;
    }

    public calculateScore = (): number => {
        let score: number = 42;
        return score;
    }
}