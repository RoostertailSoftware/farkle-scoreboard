import { Component, Input, ViewChild, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';


import { DiceClass, RollClass, TurnClass } from '@/app/shared/classes';

import * as _ from 'lodash';

const sortState: Sort = { active: "roll", direction: "desc" };

@Component({
  selector: 'app-player-roll-table',
  templateUrl: './player-roll-table.component.html',
  styleUrls: ['./player-roll-table.component.scss']
})
export class PlayerRollTableComponent implements OnChanges, DoCheck {

  @ViewChild( MatSort, { static: true } ) sort: MatSort;
  @Input() selectedTurn: TurnClass;

  playerDataSource: MatTableDataSource< RollClass >;
  displayedColumns: Array< string >;

  constructor(  ) { 
    this.displayedColumns = [ 'roll', 'dice', 'score' ];
  }
  ngDoCheck(): void {
    if( !_.isUndefined( this.selectedTurn ) ){
      this.showThisOne( this.selectedTurn );
    }
    // throw new Error('Method not implemented.');
  }

  // accept a change in active Turn or selected Turn from
  // player-turn-table.component
  ngOnChanges(  ): void {
    // if( !_.isUndefined( changes['selectedTurn'].currentValue ) ){
    //   this.showThisOne ( changes['selectedTurn'].currentValue );
    // };
    if( !_.isUndefined( this.selectedTurn ) ){
      this.showThisOne( this.selectedTurn );
    }
  };

  // set the datasource to the active/selected Turn
  private showThisOne( turn: TurnClass ) {
    this.playerDataSource = new MatTableDataSource< RollClass >( turn.roll );
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.playerDataSource.sort = this.sort;
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
