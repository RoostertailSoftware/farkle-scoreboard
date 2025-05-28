import { DiceClass, RulesConfigurationClass, ScoreDiceClass } from '@classes';
import { SCORING_TYPE } from "@enums";

import * as _ from "lodash";


let diceObject =    new DiceClass( "1", "1", "1" );
let configObject =  new RulesConfigurationClass();

describe( "basic operations", () =>{

  describe( "test straight scoring", () => {
    let test: Array< number > =  [1,1,1,1,1,1];
    it( "straight test ", ()=>{
      diceObject.selectDieByArray( test)
      let score = ScoreDiceClass.getScore( diceObject, configObject );
      expect( score ).toEqual( configObject.straightPoints )
    });
  });

  describe( "test double triples", () => {
      let test: Array< Array< number > > = 
        [ [3,3,0,0,0,0],
          [3,0,3,0,0,0],
          [3,0,0,3,0,0],
          [3,0,0,0,3,0],
          [3,0,0,0,0,3],

          [0,3,3,0,0,0], 
          [0,3,0,3,0,0], 
          [0,3,0,0,3,0], 
          [0,3,0,0,0,3], 

          [0,0,3,3,0,0], 
          [0,0,3,0,3,0], 
          [0,0,3,0,0,3], 

          [0,0,0,3,3,0], 
          [0,0,0,3,0,3], 

          [0,0,0,0,3,3] ];
        
      let answers: Array< number > = 
        [ 1200, 1300, 1400, 1500, 1600, 
          500, 600, 700, 800,
          700, 800, 900,
          900,1000,
          1100 ];

      for( let i=0; i<test.length;i++ ){
        it( "test "+test[ i ], ()=>{
          diceObject.selectDieByArray( test[ i ])
          let score = ScoreDiceClass.getScore( diceObject, configObject );
          expect( score ).toEqual( answers[ i ])
        });
      }
  });

  describe( "test tre-dubs", () => {
    let test: Array< Array< number > > = 
      [ [2,2,2,0,0,0],
        [2,2,0,2,0,0],
        [2,2,0,0,2,0],
        [2,2,0,0,0,2],

        [2,0,2,2,0,0],
        [2,0,2,0,2,0],
        [2,0,2,0,0,2],

        [2,0,0,2,2,0], 
        [2,0,0,2,0,2],

        [2,0,0,0,2,2],

        [0,2,2,2,0,0],
        [0,2,2,0,2,0],
        [0,2,2,0,0,2],

        [0,2,0,2,2,0],
        [0,2,0,2,0,2],

        [0,2,0,0,2,2],

        [0,0,2,2,2,0],
        [0,0,2,2,0,2],

        [0,0,2,0,2,2],

        [0,0,0,2,2,2] 
      
      ];
      
    for( let i=0; i<test.length;i++ ){
      it( "test "+test[ i ], ()=>{
        diceObject.selectDieByArray( test[ i ])
        let score = ScoreDiceClass.getScore( diceObject, configObject );
        expect( score ).toEqual( configObject.trippleDoublePoints )
      });
    }
});

});
