import { DiceClass, RulesConfigurationClass, ScoreDiceClass } from '@classes';
import { SCORING_TYPE } from "@enums";

import * as _ from "lodash";


let diceObject =    new DiceClass( "1", "1", "1" );
let configObject =  new RulesConfigurationClass();




describe( "scoring type: "+SCORING_TYPE[SCORING_TYPE.MULTIPLIER], () => {

  let diceObject =    new DiceClass( "1", "1", "1" );
  let configObject =  new RulesConfigurationClass();
  
  // MULTIPLIER TESTS
  configObject.scoring_type = SCORING_TYPE.MULTIPLIER;

  describe( "test dice 1 scoring", () => {
    let test: Array< Array< number > > = 
      [ [1,0,0,0,0,0],
        [2,0,0,0,0,0],
        [3,0,0,0,0,0],
        [4,0,0,0,0,0],
        [5,0,0,0,0,0],
        [6,0,0,0,0,0] ];
    let answers: Array< number > = [ 100, 200, 1000, 2000, 3000, 4000 ]

    for( let i=0; i<6;i++ ){
      it( "test "+test[ i ], ()=>{
        diceObject.selectDieByArray( test[ i ])
        let score = ScoreDiceClass.getScore( diceObject, configObject );
        expect( score ).toEqual( answers[ i ])
      });
    }
  });

  describe( "test dice 2 scoring", () => {
    let test: Array< Array< number > > = 
      [ [ 0,1,0,0,0,0 ],
        [ 0,2,0,0,0,0 ],
        [ 0,3,0,0,0,0 ],
        [ 0,4,0,0,0,0 ],
        [ 0,5,0,0,0,0 ],
        [ 0,6,0,0,0,0 ] ];
    let answers: Array< number > = [ 0, 0, 200, 400, 600, 800 ]

    for( let i=0; i<6;i++ ){

      it( "test "+test[ i ], ()=>{
        diceObject.selectDieByArray( test[ i ])
        let score = ScoreDiceClass.getScore( diceObject, configObject );
        expect( score ).toEqual( answers[ i ])
      });
    };

  });

  describe( "test dice 3 scoring", () => {
    let test: Array< Array< number > > = 
      [ [ 0,0,1,0,0,0 ],
        [ 0,0,2,0,0,0 ],
        [ 0,0,3,0,0,0 ],
        [ 0,0,4,0,0,0 ],
        [ 0,0,5,0,0,0 ],
        [ 0,0,6,0,0,0 ] ];
    let answers: Array< number > = [ 0, 0, 300, 600, 900, 1200 ]

    for( let i=0; i<6;i++ ){

      it( "test "+test[ i ], ()=>{
        diceObject.selectDieByArray( test[ i ])
        let score = ScoreDiceClass.getScore( diceObject, configObject );
        expect( score ).toEqual( answers[ i ])
      });
    };

  });

  describe( "test dice 4 scoring", () => {
    let test: Array< Array< number > > = 
      [ [ 0,0,0,1,0,0 ],
        [ 0,0,0,2,0,0 ],
        [ 0,0,0,3,0,0 ],
        [ 0,0,0,4,0,0 ],
        [ 0,0,0,5,0,0 ],
        [ 0,0,0,6,0,0 ] ];
    let answers: Array< number > = [ 0, 0, 400, 800, 1200, 1600 ]

    for( let i=0; i<6;i++ ){

      it( "test "+test[ i ], ()=>{
        diceObject.selectDieByArray( test[ i ])
        let score = ScoreDiceClass.getScore( diceObject, configObject );
        expect( score ).toEqual( answers[ i ])
      });
    };

  });

  describe( "test dice 5 scoring", () => {
    let test: Array< Array< number > > = 
      [ [ 0,0,0,0,1,0 ],
        [ 0,0,0,0,2,0 ],
        [ 0,0,0,0,3,0 ],
        [ 0,0,0,0,4,0 ],
        [ 0,0,0,0,5,0 ],
        [ 0,0,0,0,6,0 ] ];
    let answers: Array< number > = [ 50, 100, 500, 1000, 1500, 2000 ]

    for( let i=0; i<6;i++ ){

      it( "test "+test[ i ], ()=>{
        diceObject.selectDieByArray( test[ i ])
        let score = ScoreDiceClass.getScore( diceObject, configObject );
        expect( score ).toEqual( answers[ i ])
      });
    };

  });
  describe( "test dice 6 scoring", () => {
    let test: Array< Array< number > > = 
      [ [ 0,0,0,0,0,1 ],
        [ 0,0,0,0,0,2 ],
        [ 0,0,0,0,0,3 ],
        [ 0,0,0,0,0,4 ],
        [ 0,0,0,0,0,5 ],
        [ 0,0,0,0,0,6 ] ];
    let answers: Array< number > = [ 0, 0, 600, 1200, 1800, 2400 ]

    for( let i=0; i<6;i++ ){

      it( "test "+test[ i ], ()=>{
        diceObject.selectDieByArray( test[ i ])
        let score = ScoreDiceClass.getScore( diceObject, configObject );
        expect( score ).toEqual( answers[ i ])
      });
    };

  });
})

