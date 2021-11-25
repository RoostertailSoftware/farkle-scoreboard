import { AppSettingsClass } from "@classes";

import * as _ from "lodash";

/**
 * @class RulesConfigurationClass
 * Holds all the game play rules which are configurable
 * @default see constructor
 */
export class RulesConfigurationClass {

    /**
     * @constructor
     * set the default values for the Game Play configuration
     * @default
     * 
     */
         constructor( data?: any ){
            // default values
            this.winScore =         data && !_.isUndefined( data.winScore ) ? data.winScore : AppSettingsClass.WINNING_TOTAL;
            this.minScoreToStart =  data && !_.isUndefined( data.minScoreToStart ) ? data.minScoreToStart : AppSettingsClass.MIN_START_ROLL;
    
            this.nextPlayerContinuesPreviousRoll = data && !_.isUndefined( data.nextPlayerContinuesPreviousRoll ) ? data.nextPlayerContinuesPreviousRoll : true;
    
            this.maxFarkleCount =       data && !_.isUndefined( data.maxFarkleCount ) ? data.maxFarkleCount : AppSettingsClass.MAX_FARKLE_ROLLS;
            this.maxFarklePenality =    data && !_.isUndefined( data.maxFarklePenality ) ? data.maxFarklePenality : AppSettingsClass.MAX_FARKLE_PENALTY;
    
            this.doublingScoresOnTripples = data && !_.isUndefined( data.doublingScoresOnTripples ) ? data.doublingScoresOnTripples : false;
            this.trippleDoublePoints =      data && !_.isUndefined( data.trippleDoublePoints ) ? data.trippleDoublePoints : AppSettingsClass.FIVE_HUNDRED;
            this.straightPoints =           data && !_.isUndefined( data.straightPoints ) ? data.straightPoints : AppSettingsClass.STRAIGHT_POINTS;

            this.maxFarklesApplies = _.gt( this.maxFarkleCount, 0 );
        }
    
    /**
     *  This is a bit to make it easy for the system to see if it cares about
     * how many Farkles a player gets in a row.
     */
    private  _maxFarklesApplies: boolean;
    public set maxFarklesApplies( b: boolean ) {
        this._maxFarklesApplies = b;
    }
    public get maxFarklesApplies(): boolean {
        return this._maxFarklesApplies;
    }

    /**
     * This is the Score needed to Win a Game
     */
    private _winScore: number;
    public set winScore( s: number ){
        this._winScore = s;
    }
    public get winScore(): number {
        return this._winScore
    }

    /**
     * this is the Minimum score one must get on First turn to beging acquiring points.
     */
    private _minScoreToStart: number;
    public set minScoreToStart( s: number ){
        this._minScoreToStart = s;
    }
    public get minScoreToStart(): number {
        return this._minScoreToStart;
    }

    /**
     * this setting allows the player following a NON_Farkle roll to continue with the 
     * score/points and number of die left.
     * 
     * @example
     * PlayerA rolls 4 2-die and gets 400 points.  PlayerA choose to end his turn leaving
     * 2 die.
     * PlayerB can choose to build on the 400 and roll the 2 die or start at 0 with all 6.
     */
    private _nextPlayerContinuesPreviousRoll: boolean;
    public set nextPlayerContinuesPreviousRoll ( b: boolean ){
        this._nextPlayerContinuesPreviousRoll = b;
    }
    public get nextPlayerContinuesPreviousRoll(): boolean {
        return this._nextPlayerContinuesPreviousRoll;
    }

    /**
     * if the palyers want a penality can bet given to someone who
     * rolls FARKLE too many time In-a-Row.
     * This does not apply to a players first getting started.
     */
    private _maxFarkleCount: number;
    public set maxFarkleCount( s: number ){
        this._maxFarkleCount = s;
    }
    public get maxFarkleCount( ): number {
        return this._maxFarkleCount;
    }

    private _maxFarklePenality: number;
    public set maxFarklePenality( s: number ){
        this._maxFarklePenality = s;
    }
    public get maxFarklePenality( ): number {
        return this._maxFarklePenality;;
    }

    /**
     * There is a scoring rule that instead of multiplying on
     * greater than 3 triples, they double.
     * 
     * @example
     * PlayerA rolls 5 2-die
     * doublingScoreOnTripples: false
     * score=600 ( 200 * 3 ) 
     * doublingScoresOnTripples: true
     * score = 800 (200 * 2 * 2 )
     */
    private _doublingScoresOnTripples: boolean;
    public set doublingScoresOnTripples( b: boolean ){
        this._doublingScoresOnTripples = b;
    }
    public get doublingScoresOnTripples(): boolean {
        return this._doublingScoresOnTripples;
    }

    /**
     * set the points for a Triple-double
     * 3 pairs (3-3-4-4-6-6 etc)
     * By themselves 3, 4,6 don't add up to squat. And
     * double of them is less squat. However, if there are
     * a triple set of doubles, then ... they add up to `trippleDoublePoints`.
     */
    private _trippleDoublePoints: number;
    public set trippleDoublePoints( n: number ){
        this._trippleDoublePoints = n;
    }
    public get trippleDoublePoints(): number {
        return this._trippleDoublePoints;
    }

    /**
     * set the point value for a straight on one roll
     * 1-2-3-4-5-6 die
     *  
     */
    private _straightPoints: number;
    public set straightPoints( n: number ){
        this._straightPoints = n;
    }
    public get straightPoints(): number {
        return this._straightPoints;
    }


}