import { DiceClass } from "@classes";

import { BasePlayerClass } from "@classes";

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

    private _score: number;
    public set score ( n: number ){
        this._score = n;
    }
    public get score ( ): number {
        return this._score ;
    }

}