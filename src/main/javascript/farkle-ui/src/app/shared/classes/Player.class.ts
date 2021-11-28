import { PlayerGameClass, BasePlayerClass } from "@classes";


/**
 * PlayerClass is a player in the Farkle Scoreboard app.
 * THe payer has a name and has an order (which can be changed up to gameplay)
 * 
 * The players knows its score, how many points it has accumulated over its turns.
 * 
 * the player has a game which is this player's full game record.  The score is rolled up 
 * from its turns, rolls.
 */
export class PlayerClass extends BasePlayerClass {

    constructor( name?: string, order?: number ){
        super();
        this.name = name;
        this.order = order;

        this.game = new PlayerGameClass( this.id );
        this.score = 0;
     }

    private _name: string;
    public set name( s: string ){
        this._name = s;
    }
    public get name():string{
        return this._name;
    }

    private _order: number;
    public set order( n: number ){
        this._order = n;
    }
    public get order(){
        return this._order;
    }

    private _score: number;
    public set score( n: number){
        this._score = n;
    }
    public get score(){
        return this._score;
    }
    public getCurrentScore(){
        this.score = this.game.getCurrentScore();
    };


    private _game: PlayerGameClass;
    public set game( g: PlayerGameClass ){
        this._game = g;
    }
    public get game(): PlayerGameClass {
        return this._game;
    }
}
