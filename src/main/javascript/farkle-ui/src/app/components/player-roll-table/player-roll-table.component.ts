import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';


import { PlayersService } from '@/app/shared/services';
import { DiceClass, PlayerClass, RollClass } from '@/app/shared/classes';

import * as _ from 'lodash';
const sortState: Sort = { active: "roll", direction: "desc" };

@Component({
  selector: 'app-player-roll-table',
  templateUrl: './player-roll-table.component.html',
  styleUrls: ['./player-roll-table.component.scss']
})
export class PlayerRollTableComponent  {

  @ViewChild( MatSort, { static: true } ) sort: MatSort;

  playerDataSource: MatTableDataSource< RollClass >;
  displayedColumns: Array< string >;
  playerSvcObserver: any;

  constructor( private playerSvc: PlayersService ) { 
    this.displayedColumns = [ 'roll', 'dice', 'score' ];

    this.playerSvcObserver = this.playerSvc.getObservableData();
    this.playerSvcObserver.subscribe( this.changeData );
  };

  // used by the View to see if this is the current row we are 
  // on -- changes color ... purdy!
  public currentRollRow( row: any ): boolean {
    return _.eq( row.roll, this.playerDataSource.data.length );
  };

  // Data on the player has changed.
  // Grab only the active player,
  // the only the last turn in the array of turns
  private changeData = ( result: Array< PlayerClass > ): void => {
    this.playerDataSource = new MatTableDataSource < RollClass >( [] );
    
    let index = _.findIndex( result, { active: true });
    if( _.gte( index, 0 ) ) {
      const len = result[ index ].game.turn.length;
      if( _.gt( len, 0 ) ) {
        this.playerDataSource = new MatTableDataSource< RollClass > ( result[ index ].game.turn[ len -1 ].roll );
      }
      this.playerDataSource.sort = this.sort;
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
    };
  };
  
  // this is going into the table in the `dice` column.
  // currently only showing a string of the dice selected.
  // What I would like is svg of the dice(1..6) that are clickable
  // to remove them from the selection (accidently selection in <roll-action-buttons>)
  public showSelectedDice( die: DiceClass ): string {
    let s: string = "";
    const keys = [ "die_1", "die_2", "die_3", "die_4", "die_5", "die_6" ];
    _.forEach( keys, ( k: string ) => {
      let n = die[ k ];
      for( let i=0; i< n; i++ ){
        s += k+" "
      }
    });
    return s;
  };

};
