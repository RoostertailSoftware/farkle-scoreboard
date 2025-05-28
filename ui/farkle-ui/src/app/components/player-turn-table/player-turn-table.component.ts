import { Component, ViewChild, Output, EventEmitter  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';


import { PlayersService } from '@/app/shared/services';
import { PlayerClass, TurnClass } from '@/app/shared/classes';

import * as _ from 'lodash';

const sortState: Sort = { active: "turn", direction: "desc" };

@Component({
  selector: 'app-player-turn-table',
  templateUrl: './player-turn-table.component.html',
  styleUrls: ['./player-turn-table.component.scss']
})
export class PlayerTurnTableComponent {

  @ViewChild( MatSort, { static: true } ) sort: MatSort;
  @Output() selectedTurn = new EventEmitter < TurnClass >();

  public _: any = _;
  
  playerDataSource: MatTableDataSource< TurnClass >;
  displayedColumns: Array< string >;

  playerSvcObserver: any;
  constructor( private playerSvc: PlayersService ) { 
    this.displayedColumns = [ 'turn', 'score', 'rolls' ];

    this.playerSvcObserver = this.playerSvc.getObservableData();
    this.playerSvcObserver.subscribe( this.changeData );
  }

  private changeData = ( result: Array< PlayerClass > ): void => {
    this.playerDataSource = new MatTableDataSource < TurnClass >( [] );
    
    // i this is the index of the active player
    let i:number = _.findIndex( result, { active: true });
    if( _.gte( i, 0 ) ) {
      this.playerDataSource = new MatTableDataSource< TurnClass > ( result[ i ].game.turn );

      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.playerDataSource.sort = this.sort;

      // j this is the index of the active turn
      let j: number = _.findIndex( result[ i ].game.turn, { active: true } );
      this.selectedTurnRow( result[ i ].game.turn[ j ] );
    };

  };

  // used by the view
  // this is the Active Turn when the player presses the `roll x` button. But,
  // it is also a previous turn if the player selects a row to review the rolls.
  public selectedTurnRow( turn: TurnClass ){
    this.selectedTurn.emit( turn )
  };

}
