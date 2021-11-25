import { BasePlayerClass, RollClass } from "@classes";


export class TurnClass extends BasePlayerClass{

    constructor( player_id: string, turn_number: number ){
        super();
        this.player_id = player_id;

        this.turn = turn_number;
        this.roll = Array< RollClass >( )
    }

    private _player_id: string;
    public set player_id ( id: string ){
        this._player_id = id;
    }
    public get player_id ( ): string {
        return this._player_id ;
    }

    private _turn: number;
    public set turn ( n: number ){
        this._turn = n;
    }
    public get turn ( ): number {
        return this._turn ;
    }

    private _score: number;
    public set score ( n: number ){
        this._score = n;
    }
    public get score ( ): number {
        return this._score ;
    }

    private _roll: Array< RollClass >;
    public set roll ( n: Array< RollClass > ){
        this._roll = n;
    }
    public get roll ( ): Array< RollClass > {
        return this._roll ;
    }

    public getNextRoll = (): RollClass => {
        let x = new RollClass( this.player_id, this.id );
        this._roll.push( x );
        return x;

    }

}