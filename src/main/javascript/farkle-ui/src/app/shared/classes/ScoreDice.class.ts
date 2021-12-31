import { DiceClass, RulesConfigurationClass } from "@classes";
import { SCORING_TYPE, ROLL_ACTION_BUTTON_TYPES  } from "@enums";

import * as _ from "lodash";

export class ScoreDiceClass {

        private static DIE_NAME = "die_";
        constructor(  ){ }
        /**
         * Given a roll \{DiceClass} which has all the dice is the roll and the number of each of those die selected
         * for the roll score. Walks thru the number of face values [1..6] and if there is a number for that dice
         * it will calcualate the value according to how many die had that number.
         * 
         * @example
         * let dice = new DiceClass()
         * let score = ScoreDiceClass( dice, this.config );
         * // score == 700
         * 
         * @param d -{DiceClass} object used in calcuation
         * @param scoreType  - ENUM \{SCORING_TYPE} for this game
         * @param config - \{RulesConfigurationClass} Object used in this game
         * @returns \{ number } score for this set of selected dice
         */
        public static getScore = ( d: DiceClass, config: RulesConfigurationClass ): number => {
            const face: Array< number > = [ 1, 2, 3, 4, 5, 6 ];
            
            let score = 0;
            let straight_count = 0;         // this is a count to see if there is a straight
            let double_tre_count = 0;       // this is a count to see if there is a double_tre;
            _.forEach( face, ( faceValue: number ) => {
                let attribute = ScoreDiceClass.DIE_NAME + faceValue;
                    score += _.gt( d[ attribute ], 0 ) ? this.scoreMe( d, faceValue, config ): 0;
                    straight_count      += _.eq( d[ attribute ], 1 ) ? 1 : 0;
                    double_tre_count    += _.eq( d[ attribute ], 2 ) ? 1 : 0;
            } );
            
            score = _.eq( straight_count, 6 )   ? config.straightPoints :       score;
            score = _.eq( double_tre_count, 3 ) ? config.trippleDoublePoints :  score;

            return score;
        };

        public static normalizeDiceNumber = ( die: ROLL_ACTION_BUTTON_TYPES, d: DiceClass ) : DiceClass =>{
            switch ( die ){
                case ROLL_ACTION_BUTTON_TYPES.ONE:
                    d.die_1 += 1;
                    break;
                case ROLL_ACTION_BUTTON_TYPES.TWO:
                    d.die_2 += 1;
                    break;
                case ROLL_ACTION_BUTTON_TYPES.THREE:
                    d.die_3 += 1;
                    break;
                case ROLL_ACTION_BUTTON_TYPES.FOUR:
                    d.die_4 += 1;
                    break;
                case ROLL_ACTION_BUTTON_TYPES.FIVE:
                    d.die_5 += 1;
                    break;
                case ROLL_ACTION_BUTTON_TYPES.SIX:
                    d.die_6 += 1;
                    break;
            }
            return d;
        }
        /**
         * This is a sorting method according to the die presented to it.
         * 
         * @param d -{DiceClass} object used in calcuation
         * @param faceValue - \{number} the die number [1 .. 6] being counted
         * @param scoreType  - ENUM \{SCORING_TYPE} for this game
         * @param config - \{RulesConfigurationClass} Object used in this game
         * @returns \{ number } score for this set of selected dice
         */
        private static scoreMe = ( d: DiceClass, faceValue: number, config: RulesConfigurationClass ) : number => {
            let score: number =     0;

            if( _.eq( faceValue, 1 ) ) {
                score = this.die_1_scoring( d, faceValue, config );
            } else if( _.eq( faceValue, 5 ) ) {
                score = this.die_5_scoring( d,  faceValue, config );
            } else {
                score = this._die_n_scoring( d,  faceValue, config );
            }
            return score;
        }

        /**
         * This is a decision maker for die 1.  It decides according the to number of die and SCORING_TYPE what
         * helper to use to calcuate score.
         * 
         * @param d -{DiceClass} object used in calcuation
         * @param faceValue - \{number} the die number [1 .. 6] being counted
         * @param scoreType  - ENUM \{SCORING_TYPE} for this game
         * @param config - \{RulesConfigurationClass} Object used in this game
         * @returns \{ number } score for this set of selected dice
         */
        private static die_1_scoring = (  d: DiceClass, faceValue: number, config: RulesConfigurationClass ): number =>{
            const diceValue: number = d[ ScoreDiceClass.DIE_NAME + faceValue ];
            const MIN: number = faceValue * 100;
            const MAX: number = faceValue * 1000;
            let score: number = 0;
            switch( config.scoring_type ){
                case SCORING_TYPE.MULTIPLIER:
                    score = _.gte( diceValue, 3 ) ? this.multiplier_1_extra( diceValue, 1000 ) : this.multiplier_1( diceValue, MIN );
                    break;
                case SCORING_TYPE.DOUBLING:                    
                    score = _.gte( diceValue, 3 ) ? this.doubler( diceValue, 1000 ) : this.multiplier_1( diceValue, MIN );
                    break;
                case SCORING_TYPE.SET_VALUE:
                    score = _.gte( diceValue, 4 )  ? this.set_value_n( diceValue, config ) :
                    _.eq( diceValue, 3 )   ? this.multiplier_1_extra( diceValue, 1000 ) : this.multiplier_1( diceValue, MIN ); 
                    break;
            }
            return score;
        }
        /**
         * This is a decision maker for die 5.  It decides according the to number of die and SCORING_TYPE what
         * helper to use to calcuate score.

         * @param d -{DiceClass} object used in calcuation
         * @param faceValue - \{number} the die number [1 .. 6] being counted
         * @param scoreType  - ENUM \{SCORING_TYPE} for this game
         * @param config - \{RulesConfigurationClass} Object used in this game
         * @returns \{ number } score for this set of selected dice
         */
        private static die_5_scoring = (  d: DiceClass, faceValue: number, config: RulesConfigurationClass ): number =>{
            const diceValue: number = d[ ScoreDiceClass.DIE_NAME + faceValue ];
            const MIN: number = faceValue * 10;
            const MAX: number = faceValue * 100;

            let score: number = 0;

            switch( config.scoring_type ){
                case SCORING_TYPE.MULTIPLIER:
                    score = _.lte( diceValue, 2 ) ? this.multiplier_1( diceValue, MIN ) : this.multiplier( diceValue, MAX );
                    break;
                case SCORING_TYPE.DOUBLING:
                    score = _.lte( diceValue, 2 ) ? this.multiplier_1( diceValue, MIN ) : this.doubler( diceValue, MAX );
                    break;
                case SCORING_TYPE.SET_VALUE:
                    score = _.gte( diceValue, 4 )  ? this.set_value_n( diceValue, config ) :
                            _.lte( diceValue, 2 )   ? this.multiplier_1( diceValue, MIN ) : this.multiplier( diceValue, MAX ); 
                    break;
            }
            return score;
        }
        /**
         * This is a decision maker for dice 2,3,4, and 6.  It decides according the to number of die and SCORING_TYPE what
         * helper to use to calcuate score.
         * @param d -{DiceClass} object used in calcuation
         * @param faceValue - \{number} the die number [1 .. 6] being counted
         * @param scoreType  - ENUM \{SCORING_TYPE} for this game
         * @param config - \{RulesConfigurationClass} Object used in this game
         * @returns \{ number } score for this set of selected dice
         */
        private static _die_n_scoring = (  d: DiceClass, faceValue: number, config: RulesConfigurationClass ): number =>{
            let diceValue: number = d[ ScoreDiceClass.DIE_NAME + faceValue ];
            let baseValue: number = faceValue * 100;

            let score: number = 0;
            switch( config.scoring_type ){
                case SCORING_TYPE.MULTIPLIER:
                    score = _.gte( diceValue, 3 ) ? this.multiplier( diceValue, baseValue ) : 0;
                    break;
                case SCORING_TYPE.DOUBLING:
                    score = _.gte( diceValue, 3 ) ? this.doubler( diceValue, baseValue ): 0;
                    break;
                case SCORING_TYPE.SET_VALUE:
                    score = _.gte( diceValue, 4 ) ? this.set_value_n( diceValue, config ) :
                                _.eq( diceValue, 3 ) ? this.multiplier( diceValue, baseValue ): 0;
                    break;
            }
            return score;
        }

        /**
         * These methods will convert a base number which is the die * 100, 50, 1000 and
         * make sure that the number of dice are multiplied/added up correctly.
         * 
         * @param diceValue - \{number} the number of dice being counted for this die
         * @param base - a multiplier
         * @returns \{ number } score for this set of selected dice
         */
        private static multiplier = (  diceValue: number, base: number ): number =>{
            return base * ( ( diceValue - 3 ) + 1 );
        }
        private static multiplier_1 = (  diceValue: number, base: number ): number =>{
            return base * ( ( diceValue - 2 ) + 2 );
        }
        private static multiplier_1_extra = (  diceValue: number, base: number ): number =>{
            return base * ( ( diceValue - 2 ) );
        }
        private static doubler = (  diceValue: number, base: number ): number =>{
            return base * ( Math.pow( 2, ( diceValue - 3 ) ) );
        }
        private static set_value_n = (  diceValue: number, config: RulesConfigurationClass ): number =>{
            return  _.eq( diceValue , 4 )  ? config.fourOfAKind :
                    _.eq( diceValue, 5 )   ? config.fiveOfAKind : config.sixOfAKind;
        }

}