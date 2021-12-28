import { GameClass, TurnClass, RollClass } from "@classes";

import * as _ from "lodash";

export class StatisticsClass {

    private _numberOfFarkles: number;
    public set numberOfFarkels ( n: number ){ this._numberOfFarkles = n; };
    public get numberOfFarkels ( ): number { return this._numberOfFarkles; };

    private _numberOfTurns: number;
    public set numberOfTurns ( n: number ){ this._numberOfTurns = n; };
    public get numberOfTurns ( ): number { return this._numberOfTurns; };

    private _numberOfRolls: number;
    public set numberOfRolls ( n: number ){ this._numberOfRolls = n; };
    public get numberOfRolls ( ): number { return this._numberOfRolls; };
    private _averageRolls: number;
    public set averageRolls ( n: number ){ this._averageRolls = n; };
    public get averageRolls ( ): number { return this._averageRolls; };

    private _averageScorePerRoll: number;
    public set averageScorePerRoll ( n: number ){ this._averageScorePerRoll = n; };
    public get averageScorePerRoll ( ): number { return this._averageScorePerRoll; };

    private _lastTurnScore: number;
    public set lastTurnScore ( n: number ){ this._lastTurnScore = n; };
    public get lastTurnScore ( ): number { return this._lastTurnScore; };


    private _game: GameClass;
    public set game ( g: GameClass ){ this._game = g; };
    public get game ( ): GameClass { return this._game; };

    constructor( g: GameClass ){
        this.game = g;
        this.runStats();
    };

    public runStats = ( ): void =>{
        this.numberOfFarkels =  this.calculateFarkles();
        this.numberOfTurns =    this.calculateTurns();

        this.numberOfRolls =    this.calculateRolls();
        this.averageRolls = this.calculateAverageRolls();

        this.averageScorePerRoll =  this.calcuateAverageScorePerRoll();

        this.lastTurnScore =    this.calculateLastTurnScore();
    };

    public calculateTurns = ( ): number =>{
        return this.game.turn.length;
    };

    public calculateAverageRolls = ( ): number =>{
        let num = _.eq( this.numberOfRolls, 0 ) ? 0 : this.numberOfRolls;
        let den = _.eq( this.numberOfTurns, 0 ) ? 1 : this.numberOfTurns;
        return num / den;
    }

    public calcuateAverageScorePerRoll = ( ): number => {
        let score = this.calculateScore();
        let num = _.eq( score, 0 ) ? 0 : score;
        let den = _.eq( this.numberOfRolls, 0 ) ? 1 : this.numberOfRolls;
        return num / den;
    }
    public calculateFarkles = (): number => {
        let totalFarkeles: number = 0;
        _.forEach( this.game.turn, ( t: TurnClass ) =>{
            totalFarkeles += t.farkled ? 1 : 0;
        } );
        return totalFarkeles;
    };

    public calculateRolls = ( ): number => {
        let totalRolls: number = 0;
        _.forEach( this.game.turn, ( t: TurnClass )=>{
            totalRolls += t.roll.length
        } );
        return totalRolls;
    };

    public calculateScore = (): number =>{
        let score: number = 0;
        _.forEach( this.game.turn, ( t: TurnClass ) => {
            score += t.score;
        } );
        return score;
    };

    public calculateLastTurnScore( ): number {
        let score: number = 0;
        let index: number = this.game.turn.length;
        if( _.gt( index, 1 ) ) {
            score = this.game.turn[ index -2 ].score;
        }
        return score;
    }

};
