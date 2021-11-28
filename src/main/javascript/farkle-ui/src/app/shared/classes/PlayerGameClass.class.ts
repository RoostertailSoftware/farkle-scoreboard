import { TurnClass, BasePlayerClass } from "@classes";
import * as _ from "lodash";

/**
 * The gameclass is the game for this player only.
 * the game has an id, and has a player_id.
 * It consists of an array of turns - which are numbered
 * from 0 .. n.
 * 
 */
export class PlayerGameClass extends BasePlayerClass {

    constructor( player_id: string ){
        super();
        this.player_id = player_id;
        
        this.turn = Array< TurnClass >( );
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
    public addTurn( t: TurnClass ): void {
        this._turn.push( t );
    };

    /**
     * calculates the current score by asking each turn what their
     * their score is.
     */
    public getCurrentScore = (): number => {
        let score: number = 0;
        _.forEach( this.turn, (t:TurnClass ) => {
            score += t.getCurrentScore();
        });
        return score;

    }
}