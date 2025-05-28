import { DiceClass, RulesConfigurationClass, ScoreDiceClass } from '@classes';
import { SCORING_TYPE } from "@enums";

import * as _ from "lodash";


let diceObject =    new DiceClass( "1", "1", "1" );
let configObject =  new RulesConfigurationClass();


describe( "scoring type: "+SCORING_TYPE[SCORING_TYPE.DOUBLING], () =>{
  let diceObject =    new DiceClass( "1", "1", "1" );
  let configObject =  new RulesConfigurationClass();
  

  // Doubler
  configObject.scoring_type = SCORING_TYPE.DOUBLING;

  describe( "test dice 1 scoring", () => {
    let test: Array< Array< number > > = 
      [ [1,0,0,0,0,0],
        [2,0,0,0,0,0],
        [3,0,0,0,0,0],
        [4,0,0,0,0,0],
        [5,0,0,0,0,0],
        [6,0,0,0,0,0] ];
    let answers: Array< number > = [ 100, 200, 1000, 2000, 4000, 8000 ]

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
    let answers: Array< number > = [ 0, 0, 200, 400, 800, 1600 ]

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
    let answers: Array< number > = [ 0, 0, 300, 600, 1200, 2400 ]

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
    let answers: Array< number > = [ 0, 0, 400, 800, 1600, 3200 ]

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
    let answers: Array< number > = [ 50, 100, 500, 1000, 2000, 4000 ]

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
    let answers: Array< number > = [ 0, 0, 600, 1200, 2400, 4800 ]

    for( let i=0; i<6;i++ ){

      it( "test "+test[ i ], ()=>{
        diceObject.selectDieByArray( test[ i ])
        let score = ScoreDiceClass.getScore( diceObject, configObject );
        expect( score ).toEqual( answers[ i ])
      });
    };
  })

});
