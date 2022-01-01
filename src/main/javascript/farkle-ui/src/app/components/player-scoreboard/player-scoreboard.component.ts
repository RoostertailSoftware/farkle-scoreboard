import { Component  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { PlayersService } from '@services';
import { PlayerClass } from '@classes';

import * as _ from 'lodash';

@Component({
  selector: 'app-player-scoreboard',
  templateUrl: './player-scoreboard.component.html',
  styleUrls: ['./player-scoreboard.component.scss']
})
export class PlayerScoreboardComponent {

  playerDataSource: MatTableDataSource< PlayerClass >;
  playerObservable: any;
  displayedColumns: Array< string >;

  constructor( private playerSvc: PlayersService) {
    this.playerObservable = playerSvc.getObservableData();
    this.playerObservable.subscribe( result =>{
      if( _.isNull( result )){
        this.playerDataSource = new MatTableDataSource< PlayerClass> ( [] )
      } else {
        this.playerDataSource = new MatTableDataSource< PlayerClass> (result );
      }

      if( _.gt( this.playerDataSource.data.length, 1 ) ) {
        this.displayedColumns = [ 'order', 'player', 'score', 'place' ];
      } else  {
        this.displayedColumns = [ 'order', 'player', 'score' ];
      }
  
    });
    
    this.displayedColumns = [ 'order', 'player', 'score' ];

   };


  drop( event: CdkDragDrop< any > ) {
    const previousIndex = this.playerDataSource.data.findIndex( row => row === event.item.data );
    moveItemInArray( this.playerDataSource.data, previousIndex, event.currentIndex );
    this.playerDataSource.data = this.playerDataSource.data.slice();
    this.resetOrder();
  }

  resetOrder ( ){
    _.forEach( this.playerDataSource.data, (p: PlayerClass, index: number ) => {
        p.order = (index+1)
    } )
  };

  // returns the number 1 .. nth place the person is in currently
  place( row: any ): number {
    let reverseScoreSort: any = _.sortBy( this.playerDataSource.data, ( r: PlayerClass ) =>{
      return r.score;
    } );
    let rowIndexed: number = _.findIndex( reverseScoreSort, { id: row.id } ) ;
    return ( this.playerDataSource.data.length - rowIndexed ) ;
  }
}
