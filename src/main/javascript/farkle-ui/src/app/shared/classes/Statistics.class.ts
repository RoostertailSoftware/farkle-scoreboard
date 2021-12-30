import { GameClass, TurnClass, RollClass } from "@classes";

import * as _ from "lodash";

export class StatisticsClass {

    private _numberOfTurns: number;
    public set numberOfTurns ( n: number ){ this._numberOfTurns = n; };
    public get numberOfTurns ( ): number { return this._numberOfTurns; };

    private _numberOfRolls: number;
    public set numberOfRolls ( n: number ){ this._numberOfRolls = n; };
    public get numberOfRolls ( ): number { return this._numberOfRolls; };

    private _averageRollsPerTurn: number;
    public set averageRollsPerTurn ( n: number ){ this._averageRollsPerTurn = n; };
    public get averageRollsPerTurn ( ): number { return this._averageRollsPerTurn; };

    private _averageScorePerRoll: number;
    public set averageScorePerRoll ( n: number ){ this._averageScorePerRoll = n; };
    public get averageScorePerRoll ( ): number { return this._averageScorePerRoll; };

    private _lastTurnScore: number;
    public set lastTurnScore ( n: number ){ this._lastTurnScore = n; };
    public get lastTurnScore ( ): number { return this._lastTurnScore; };

    private _numberOfFarkles: number;
    public set numberOfFarkels ( n: number ){ this._numberOfFarkles = n; };
    public get numberOfFarkels ( ): number { return this._numberOfFarkles; };

    private _game: GameClass;
    public set game ( g: GameClass ){ this._game = g; };
    public get game ( ): GameClass { return this._game; };

    constructor( g: GameClass ){
        this.game = g;
        this.runStats();
    };

    public runStats ( ): void {
        this.numberOfFarkels =  this.calculateFarkles();
        this.numberOfTurns =    this.calculateTurns();

        this.numberOfRolls =    this.calculateRolls();
        this.averageRollsPerTurn = this.calculateAverageRollsPerTurn();

        this.averageScorePerRoll =  this.calcuateAverageScorePerRoll();

        this.lastTurnScore =    this.calculateLastTurnScore();
    };

    private calculateTurns ( ): number {
        return this.game.turn.length;
    };

    /**
     * a valid turn is one that has a score, or one that is farkled and score of 0.
     * This is because a times I have a turn in the array but it hasn't been filled in yet.
     * @returns \{ number } valid turns
     */
    private calculateValidTurn ( ): number {
        let count: number = 0;
        _.forEach( this.game.turn, ( t: TurnClass ) => {
            count += ( _.gt( t.score, 0 ) || ( _.eq( t.score, 0 ) && t.farkled ) ) ? 1 : 0;
        });
        return count;
    }

    /**
     * calcuate the average rolls per turn taking into account
     * the number of farkled rolls.
     * @returns \{ number } rolls/turn
     */
    private calculateAverageRollsPerTurn( ): number {
        let num = _.eq( this.calculateRolls(), 0 ) ? 0 : this.calculateRolls();
        let f   = this.calculateFarkles();
        let den = _.eq( this.calculateValidTurn() , 0 ) ? 1 : this.calculateValidTurn();
        return ( num + f ) / den;
    }

    /**
     * Calculates the average score per roll NOT taking into account
     * the farkled roll.
     * @returns \{ number } score/roll
     */
    private calcuateAverageScorePerRoll ( ): number  {
        let score = this.calculateScore();
        let num = _.eq( score, 0 ) ? 0 : score;
        let den = _.eq( this.numberOfRolls, 0 ) ? 1 : this.numberOfRolls;
        return num / den;
    }

    /**
     * Count of turns which resulted in a farkle
     * @returns \{ number } farkles
     */
    private calculateFarkles (): number  {
        let totalFarkeles: number = 0;
        _.forEach( this.game.turn, ( t: TurnClass ) =>{
            totalFarkeles += t.farkled ? 1 : 0;
        } );
        return totalFarkeles;
    };

    /**
     * Calculates the number of rolls that resulted in a score being
     * recorded (ie !farkled)
     * @returns \{ number } of rolls
     */
    private calculateRolls ( ): number  {
        let totalRolls: number = 0;
        _.forEach( this.game.turn, ( t: TurnClass ) => {
            _.forEach( t.roll, ( r: RollClass ) => {
                totalRolls +=  _.gt( r.score, 0 )  ? 1 : 0;
            })
        } );
        return totalRolls;
    };

    /**
     * calculate all the final score.  In this case I am using
     * the sum of turns.
     * @returns \{ number } score
     */
    private calculateScore (): number {
        let score: number = 0;
        _.forEach( this.game.turn, ( t: TurnClass ) => {
            score += t.score;
        } );
        return score;
    };

    /**
     * return the last score
     * @returns \{ number } score
     */
    private calculateLastTurnScore( ): number {
        let score: number = 0;
        let index: number = this.game.turn.length;
        if( _.gt( index, 1 ) ) {
            score = this.game.turn[ index -2 ].score;
        }
        return score;
    }

};
