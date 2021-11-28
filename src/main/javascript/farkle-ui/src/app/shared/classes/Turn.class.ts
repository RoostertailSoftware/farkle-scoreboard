
import { BasePlayerClass, RollClass, RulesConfigurationClass } from "@classes";
import * as _ from "lodash";

/**
 * A trun is part of a Player's game.  A Turn consists of
 * an array of rolls. Rolls are numbered from 0 .. n.
 * 
 * A Player's first turn must be a minimum of RulesConfigurationClass.minScoreToStart.
 */
export class TurnClass extends BasePlayerClass{

    constructor( player_id: string, turn_number: number ){
        super();
        this.player_id = player_id;

        this.turn = turn_number;
        this.roll = Array< RollClass >( );
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

    public getCurrentScore = (): number => {
        let score: number = 0;
        _.forEach( this.roll, (r: RollClass ) =>{
            score += r.calculateScore();
        });
        return score;
    }
}