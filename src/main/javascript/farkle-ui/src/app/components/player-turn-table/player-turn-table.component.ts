import { Component, OnInit  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


import { PlayersService } from '@/app/shared/services';
import { PlayerClass, TurnClass } from '@/app/shared/classes';

import * as _ from 'lodash';

@Component({
  selector: 'app-player-turn-table',
  templateUrl: './player-turn-table.component.html',
  styleUrls: ['./player-turn-table.component.scss']
})
export class PlayerTurnTableComponent implements OnInit {

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
    }
  };

  ngOnInit(): void {
    
  }

}
