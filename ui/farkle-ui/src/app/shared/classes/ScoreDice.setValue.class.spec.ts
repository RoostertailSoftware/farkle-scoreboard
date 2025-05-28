import { DiceClass, RulesConfigurationClass, ScoreDiceClass } from '@classes';
import { SCORING_TYPE } from "@enums";

import * as _ from "lodash";


describe( "scoring type: "+SCORING_TYPE[SCORING_TYPE.SET_VALUE], () =>{
  let diceObject =    new DiceClass( "1", "1", "1" );
  let configObject =  new RulesConfigurationClass();
  
  let fourOfAKind = configObject.fourOfAKind;
  let fiveOfAKind = configObject.fiveOfAKind;
  let sixOfAKind = configObject.sixOfAKind;

  // Doubler
  configObject.scoring_type = SCORING_TYPE.SET_VALUE;

  describe( "test dice 1 scoring", () => {
    let test: Array< Array< number > > = 
      [ [1,0,0,0,0,0],
        [2,0,0,0,0,0],
        [3,0,0,0,0,0],
        [4,0,0,0,0,0],
        [5,0,0,0,0,0],
        [6,0,0,0,0,0] ];
    let answers: Array< number > = [ 100, 200, 1000, fourOfAKind, fiveOfAKind, sixOfAKind ]

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
    let answers: Array< number > = [ 0, 0, 200, fourOfAKind, fiveOfAKind, sixOfAKind ]

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
    let answers: Array< number > = [ 0, 0, 300, fourOfAKind, fiveOfAKind, sixOfAKind ]

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
    let answers: Array< number > = [ 0, 0, 400, fourOfAKind, fiveOfAKind, sixOfAKind ]

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
    let answers: Array< number > = [ 50, 100, 500, fourOfAKind, fiveOfAKind, sixOfAKind ]

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
    let answers: Array< number > = [ 0, 0, 600, fourOfAKind, fiveOfAKind, sixOfAKind ]

    for( let i=0; i<6;i++ ){

      it( "test "+test[ i ], ()=>{
        diceObject.selectDieByArray( test[ i ])
        let score = ScoreDiceClass.getScore( diceObject, configObject );
        expect( score ).toEqual( answers[ i ])
      });
    };
  })

});
