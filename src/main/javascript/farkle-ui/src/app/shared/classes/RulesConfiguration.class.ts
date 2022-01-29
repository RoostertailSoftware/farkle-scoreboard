import { AppSettingsClass } from "@classes";
import { SCORING_TYPE  } from "@enums";

import * as _ from "lodash";

/**
 * @class RulesConfigurationClass
 * Holds all the game play rules which are configurable
 * @default see constructor
 */
export class RulesConfigurationClass {


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
 
    /**
     * Scoring type is one of three
     * SCORING_TYPE.MULTIPLIER -  Default
     * SCORING_TYPE.DOUBLING
     * SCORING_TYPE.SET_VALUE
     * if SET_VALUE is selected then fourOfAKind, fiveOfAKind, sixOfAKind values
     * can be changed by the configuration Dialog.
     * 
     * @example
     * PlayerA rolls 5 2-die
     * SCORING_TYPE.MULTIPLIER
     * score=600 ( 200 * 3 ) 
     * SCORING_TYPE.DOUBLING
     * score = 800 (200 * 2 * 2 )
     * SCORING_TYPE.SET_VALUE
     * score = this.fiveOfAKind // no matter the die value
     */
    private _scoring_type: SCORING_TYPE;
    public set scoring_type( s: SCORING_TYPE ){
        this._scoring_type = s;
    }
    public get scoring_type(): SCORING_TYPE {
        return this._scoring_type;
    }

    private _fourOfAKind: number;
    public set fourOfAKind( n: number ){
        this._fourOfAKind = n;
    }
    public get fourOfAKind(): number {
        return this._fourOfAKind;
    }

    private _fiveOfAKind: number;
    public set fiveOfAKind( n: number ){
        this._fiveOfAKind = n;
    }
    public get fiveOfAKind(): number {
        return this._fiveOfAKind;
    }

    private _sixOfAKind: number;
    public set sixOfAKind( n: number ){
        this._sixOfAKind = n;
    }
    public get sixOfAKind(): number {
        return this._sixOfAKind;
    }

    /**
     * @constructor
     * set the default values for the Game Play configuration
     * @default
     * 
     */
     constructor( data?: any ){
        // default values
        this.nextPlayerContinuesPreviousRoll = data && !_.isUndefined( data.nextPlayerContinuesPreviousRoll ) ? data.nextPlayerContinuesPreviousRoll : true;

        this.winScore =         data && !_.isUndefined( data.winScore ) ? +data.winScore : AppSettingsClass.WINNING_TOTAL;
        this.minScoreToStart =  data && !_.isUndefined( data.minScoreToStart )  ? +data.minScoreToStart : AppSettingsClass.MIN_START_ROLL;


        this.maxFarkleCount =       data && !_.isUndefined( data.maxFarkleCount )   ? +data.maxFarkleCount : AppSettingsClass.MAX_FARKLE_ROLLS;
        this.maxFarklePenality =    data && !_.isUndefined( data.maxFarklePenality )    ? +data.maxFarklePenality : AppSettingsClass.MAX_FARKLE_PENALTY;

        this.trippleDoublePoints =      data && !_.isUndefined( data.trippleDoublePoints )  ? +data.trippleDoublePoints : AppSettingsClass.FIVE_HUNDRED;
        this.straightPoints =           data && !_.isUndefined( data.straightPoints )   ? +data.straightPoints : AppSettingsClass.STRAIGHT_POINTS;

        this.scoring_type = data && !_.isUndefined( data.scoring_type ) ? +data.scoring_type :   SCORING_TYPE.MULTIPLIER;

        this.fourOfAKind =  data && !_.isUndefined( data.fourOfAKind )  ? +data.fourOfAKind :    AppSettingsClass.ONE_THOUSAND;
        this.fiveOfAKind =  data && !_.isUndefined( data.fiveOfAKind )  ? +data.fiveOfAKind :    AppSettingsClass.TWO_THOUSAND;
        this.sixOfAKind =   data && !_.isUndefined( data.sixOfAKind )   ? +data.sixOfAKind :     AppSettingsClass.THREE_THOUSAND;



        this.maxFarklesApplies = _.gt( this.maxFarkleCount, 0 );
    }

    /*
     * given a die, and the number of them (total) as well as the configuration.scoring_type, return
     * the value.
    */
    public  getScoreValue ( die: number, total: number ): number  {
        let x: number = this.getInitialValue( die, total );
        switch ( +this.scoring_type ){
            case SCORING_TYPE.MULTIPLIER:
                let multiplier = _.eq( total, 4 ) ? 2 :  _.eq( total, 5 ) ? 3 : _.eq( total, 6 ) ? 4 : 1;
                x =  x * multiplier;
                break;
            case SCORING_TYPE.DOUBLING:
                let doubler = _.eq( total, 4 ) ? Math.pow( 2, 1 ) : _.eq( total, 5 ) ?  Math.pow( 2, 2 ) : _.eq( total, 6 ) ?  Math.pow( 2, 3) : 1;
                x = x * doubler;
                break;
            case SCORING_TYPE.SET_VALUE:
                x = _.eq( total, 4 ) ? this.fourOfAKind : _.eq( total, 5 ) ?  this.fiveOfAKind : _.eq( total, 6 ) ?  this.sixOfAKind : x;
                break;
        }
        return x;
    };

    private  getInitialValue ( die: number, total:number ): number {
        let x: number = 0;
        switch( die ){
            case 1: 
                x = _.gte( total, 3 ) ? 1000 : 100;
                break;
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
                x = _.gte( total, 3 ) ? die * 100 : 0;
                break;
        }
        return x;
    }
}