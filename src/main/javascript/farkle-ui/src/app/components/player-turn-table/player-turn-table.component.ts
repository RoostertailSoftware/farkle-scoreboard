import { Component, ViewChild  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';


import { PlayersService } from '@/app/shared/services';
import { PlayerClass, TurnClass } from '@/app/shared/classes';

import * as _ from 'lodash';

@Component({
  selector: 'app-player-turn-table',
  templateUrl: './player-turn-table.component.html',
  styleUrls: ['./player-turn-table.component.scss']
})
export class PlayerTurnTableComponent {

  @ViewChild( MatSort, { static: true } ) sort: MatSort;

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
    this.playerDataSource = new MatTableDataSource < TurnClass>( [] );
    
    let i = _.findIndex( result, { active: true });
    if( _.gte( i, 0 ) ) {
      this.playerDataSource = new MatTableDataSource< TurnClass> ( result[ i ].game.turn );

      this.playerDataSource.sort = this.sort;
      const sortState: Sort = { active: "turn", direction: "desc" };
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
    }
  };
  
  public currentTurnRow ( row: any  ): boolean {
    return _.eq( row.turn, this.playerDataSource.data.length )
  }

}
