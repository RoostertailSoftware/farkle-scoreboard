import { BasePlayerClass } from "@classes";

export class DiceClass extends BasePlayerClass {

    constructor( player_id: string, turn_id: string, roll_id: string ){
        super();
        this.player_id = player_id;
        this.turn_id = turn_id;
        this.roll_id = roll_id;

        this.die_1 = 0;
        this.die_2 = 0;
        this.die_3 = 0;
        this.die_4 = 0;
        this.die_5 = 0;
        this.die_6 = 0;
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
    private _roll_id: string;
    public set roll_id( s: string ){
        this._roll_id = s;
    }
    public get roll_id(): string {
        return this._roll_id;
    }

    public incrementDice( d: string ){
        this["dice_"+d ] += 1;
    }
    private _die_1: number;
    public set die_1 (d: number ){
        this._die_1 = d;
    }
    public get die_1 (): number{
        return this._die_1;
    }

    private _die_2: number;
    public set die_2 (d: number ){
        this._die_2 = d;
    }
    public get die_2 (): number{
        return this._die_2;
    }

    private _die_3: number;
    public set die_3 (d: number ){
        this._die_3 = d;
    }
    public get die_3 (): number{
        return this._die_3;
    }
    private _die_4: number;
    public set die_4 (d: number ){
        this._die_4 = d;
    }
    public get die_4 (): number{
        return this._die_4;
    }
    private _die_5: number;
    public set die_5 (d: number ){
        this._die_5 = d;
    }
    public get die_5 (): number{
        return this._die_5;
    }
    private _die_6: number;
    public set die_6 (d: number ){
        this._die_6 = d;
    }
    public get die_6 (): number{
        return this._die_6;
    }

}