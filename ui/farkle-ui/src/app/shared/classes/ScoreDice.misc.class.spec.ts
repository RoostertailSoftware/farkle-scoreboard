import { DiceClass, RulesConfigurationClass, ScoreDiceClass } from '@classes';
import { SCORING_TYPE } from "@enums";

import * as _ from "lodash";


let diceObject =    new DiceClass( "1", "1", "1" );
let configObject =  new RulesConfigurationClass();

describe( "Misc operations", () =>{

  describe( "test random valid entries", () => {
      let test: Array< Array< number > > = 
        [ 
          [0,1,1,1,0,1],
          [0,2,2,1,0,1],
          [0,1,1,0,0,2],
          [0,2,0,2,0,0],
          [0,2,1,1,0,2],
          [0,2,2,1,0,1] ];
        
      for( let i=0; i<test.length;i++ ){
        it( "test "+test[ i ], ()=>{
          diceObject.selectDieByArray( test[ i ])
          let score = ScoreDiceClass.getScore( diceObject, configObject );
          expect( score ).toEqual( 0 )
        });
      }
  });


});
