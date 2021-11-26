import { GameClass, BasePlayerClass } from "@classes";

export class PlayerClass extends BasePlayerClass {

    constructor( name?: string, order?: number ){
        super();
        this.name = name;
        this.order = order;

        this.game = new GameClass( this.id );
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

    private _game: GameClass;
    public set game( g: GameClass ){
        this._game = g;
    }
    public get game(): GameClass {
        return this._game;
    }
}
