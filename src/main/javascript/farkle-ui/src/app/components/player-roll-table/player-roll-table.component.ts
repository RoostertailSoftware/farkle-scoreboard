import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';


import { PlayersService } from '@/app/shared/services';
import { DiceClass, PlayerClass, RollClass } from '@/app/shared/classes';

import * as _ from 'lodash';

@Component({
  selector: 'app-player-roll-table',
  templateUrl: './player-roll-table.component.html',
  styleUrls: ['./player-roll-table.component.scss']
})
export class PlayerRollTableComponent implements OnChanges {

  @ViewChild( MatSort, { static: true } ) sort: MatSort;
  @Input() die: DiceClass;

  public _: any = _;
  
  playerDataSource: MatTableDataSource< RollClass >;
  diceSelection: DiceClass;
  displayedColumns: Array< string >;

  playerSvcObserver: any;
  constructor( private playerSvc: PlayersService ) { 
    this.displayedColumns = [ 'roll', 'dice', 'score', 'button' ];

    this.playerSvcObserver = this.playerSvc.getObservableData();
    this.playerSvcObserver.subscribe( this.changeData );
  };

  // This is the dice selection from <app-roll-action-buttons
  // from an Output() emitter
  ngOnChanges( changes: SimpleChanges ): void {
    if( !changes['die'].firstChange ){
      this.getDiceIconsReady( changes['die'].currentValue );
    }
  }
  public currentRollRow( row: any ): boolean {
    return _.eq( row.roll, this.playerDataSource.data.length );
  };

  private changeData = ( result: Array< PlayerClass > ): void => {
    this.playerDataSource = new MatTableDataSource < RollClass>( [] );
    
    let i = _.findIndex( result, { active: true });
    if( _.gte( i, 0 ) ) {
      const len = result[ i ].game.turn.length;
      if( _.gt( len, 0 ) ) {
        this.playerDataSource = new MatTableDataSource< RollClass> ( result[ i ].game.turn[ len -1 ].roll );
      }
      this.playerDataSource.sort = this.sort;
      const sortState: Sort = { active: "roll", direction: "desc" };
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
    }
  };
  

  private getDiceIconsReady( die: DiceClass ){
    this.diceSelection = die;
      console.log( this.diceSelection );
  }

};
