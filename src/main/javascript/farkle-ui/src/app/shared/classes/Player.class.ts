import { BasePlayerClass, GameClass, RollClass, DiceClass, RulesConfigurationClass } from "@classes";

import * as _ from "lodash";
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

    private _name: string;
    public set name( s: string ){ this._name = s; }
    public get name( ): string{ return this._name; }

    private _order: number;
    public set order( n: number ){ this._order = n;}
    public get order(){ return this._order; }

    private _active: boolean;
    public set active( n: boolean ){ this._active = n;}
    public get active(){ return this._active; }

    private _game: GameClass;
    public set game( g: GameClass ){  this._game = g; }
    public get game(): GameClass { return this._game; }

    private _score: number;
    public set score( n: number){ this._score = n; }
    public get score(){ return this._score; }

    constructor( name?: string, order?: number ){
        super();
        this.name = name;
        this.order = order;
        this.active = false;

        this.game = new GameClass( );
        this.score = 0;
     };

    public getNextTurn = ( ): number =>{
        return this.game.addTurn( );
    }

    public roll ( turn_index: number, diceCount: number ): number {
        return this.game.newRoll( turn_index, diceCount );
    };

    public setRollDice( turn_index: number, roll_index: number, dice: DiceClass ): void {
        this.game.setRollDice( turn_index, roll_index, dice )
    }
    // Player says they are done with turn, button this one up
    // set the score.
    public finishTurn ( config: RulesConfigurationClass ) {
        let index = _.findIndex( this.game.turn, { active: true } );
        if( _.gt( index, -1 ) ) {
            this.game.turn[ index ].active = false;
            _.forEach( this.game.turn[ index ].roll, ( roll: RollClass ) => {
                roll.active = false;
            } )
        }
        this.getScore( config );
    };

    public farkle ( turn_index: number, roll_index: number ) {
        return this.game.farkle( turn_index, roll_index );
    };

    // Score for all turns, all rolls
    private  getScore ( config: RulesConfigurationClass ) {
        this.score = this.game.getScore( config );
    };

    public turnScore ( turn_index: number, config: RulesConfigurationClass ):number {
        return this.game.turnScore( turn_index, config );
    };

};
