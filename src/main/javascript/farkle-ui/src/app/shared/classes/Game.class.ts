import { TurnClass, BasePlayerClass } from "@classes";

export class GameClass extends BasePlayerClass {

    constructor( player_id: string ){
        super();
        this.player_id = player_id;
        
        this.turn = Array< TurnClass >( );
        this.nextTurnNumber = 0;
    }

    private _player_id: string;
    public set player_id ( id: string ){
        this._player_id = id;
    }
    public get player_id ( ): string {
        return this._player_id ;
    }

    private _turn: Array< TurnClass >;
    public set turn ( t: Array< TurnClass > ){
        this._turn = t;
    }
    public get turn( ): Array< TurnClass > {
        return this._turn;
    }
    private addTurn( t: TurnClass ): void {
        this._turn.push( t );
    };

    private _nextTurnNumber: number;
    public get nextTurnNumber(): number {
        return ++this._nextTurnNumber;
    }
    private set nextTurnNumber( n: number){
        this._nextTurnNumber = n;
    }

    

    public getNextTurn = (): TurnClass => {
        // First, find out what the largest turn number
        let x = new TurnClass( this.player_id, this.nextTurnNumber );
        this.addTurn( x );
        return x;
;    }
}