import { Component, ElementRef, Input, ViewChild, OnChanges, SimpleChanges, DoCheck, AfterViewChecked, Output, EventEmitter } from '@angular/core';
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
export class PlayerRollTableComponent implements OnChanges, DoCheck, AfterViewChecked {

  @ViewChild( MatSort, { static: true } ) sort: MatSort;
  @Input() selectedTurn: TurnClass;
  @Output() dieRemoved = new EventEmitter< boolean >();

  playerDataSource: MatTableDataSource< RollClass >;
  displayedColumns: Array< string >;

  constructor( private elementRef: ElementRef ) { 
    this.displayedColumns = [ 'roll', 'dice', 'score' ];
  }
  // accept a change in active Turn or selected Turn from
  // player-turn-table.component
  ngOnChanges(  changes: SimpleChanges ): void {
    if( !_.isUndefined( this.selectedTurn ) ){
      this.setPlayerDataSource( this.selectedTurn );
    }
  };
  // Using this to get DataSource -- seems like the
  // onChanges is not catching some things deeper in an object.
  // even if I am pushing it out with emit().
  ngDoCheck(): void {
    if( !_.isUndefined( this.selectedTurn ) ){
      this.setPlayerDataSource( this.selectedTurn );
    }
  }

  // Building an eventListener to put into a table data icons/buttons after they are
  // pushed inot the table.
  // From the active roll,
  ngAfterViewChecked(): void {
    let roll : RollClass;
    if( !_.isUndefined( this.playerDataSource ) ){
      const i: number = _.findIndex( this.playerDataSource.data, { active: true } );
      roll = this.playerDataSource.data[ i ];
      const keys: Array< string > = [ "die_1", "die_2", "die_3", "die_4", "die_5", "die_6" ];
      _.forEach( keys, ( k: string ) => {
        // n is the number of dice selected from the UI for a specific die (ie total of 3 die_1s, or just 1 die_5 etc)
        let n = roll.diceSelection[ k ];
        for( let i=0; i< n; i++ ){
          const j: number = _.findIndex( this.selectedTurn.roll, { active: true } );
          let id = this.buildDiceId( j, k, i );

          // dieSelector is the html element which has the id already on it, from the table after
          // a call to this.showSelectedDice().
          let dieSelector = this.elementRef.nativeElement.querySelector( "#"+id );
          if( !_.isNull( dieSelector ) ){
            dieSelector.addEventListener( "click", this.unsetDie.bind(this), false );
          }
        }
      });
    }
  }

  // This will remove the die selected from the `diceSelection`. Then it will
  // remove the eventListener.
  public unsetDie( dieSelector: any ) {
    console.log( "unsetting: " + dieSelector.currentTarget.id );

    let partArray: Array< string > = _.split( dieSelector.currentTarget.id, '-' );

    let x: number = this.selectedTurn.roll[ +partArray[1] ].diceSelection[ partArray[ 2 ] ];
    if( _.gte( x, +partArray[3]+1 ) ){
      this.selectedTurn.roll[ +partArray[1] ].diceSelection[ partArray[ 2 ] ] -= 1;
      let x: any = this.elementRef.nativeElement.querySelector( "#"+dieSelector.currentTarget.id );
      x.removeEventListener( "click", this.unsetDie)
      x.remove();
      this.incrementDieCount();
    }
  }

  // What I am doing here.  Sending out an emit all the way to
  // app.component and then down to app-roll-action-buttons that a die
  // was de-selected and removed. Therefore, increment the die count back
  // on the `roll x ` button. But, I have to reset the value of the emit or
  // it will not register again. So, I wait 1 second and send the reset.
  private incrementDieCount(){
    this.dieRemoved.emit( true );
    setTimeout( ()=> {
      this.dieRemoved.emit( false );
    }, 1000)
  }
  /**
   *  Build a unique deterministic ID for a specific roll, die and die count.
   * @param rollIndex \{ number } - the roll's index in a TurnClass.roll[ 0..n ]
   * @param dieFace \{ string } - the dice face value `die_x` [ x = 1..6 ]
   * @param dieCount \{ number } - the number of this die. there could be [ 0..6 ] max
   * @returns \{ string } a unique, deterministic, easily `split()` value used as an `id` for an html component in the form of
   * "id_button-[rollIndex]-[diceFace]-[dieCount]"
   */
  public buildDiceId( rollIndex: number, dieFace: string, dieCount: number ): string {
    let id: string = "id_button";
    const spacer: string = "-"

    return id + spacer +
            rollIndex + spacer +
            dieFace + spacer +
            dieCount;
  };

  // this is going into the table in the `dice` column.
  // currently only showing a string of the dice selected.
  // What I would like is svg of the dice(1..6) that are clickable
  // to remove them from the selection (accidently selection in <roll-action-buttons>)
  public showSelectedDice( die: DiceClass ): string {
    let s: string = "";
    const keys = [ "1", "2", "3", "4", "5", "6" ];
    _.forEach( keys, ( k: string ) => {
      let n = die[ "die_"+k ];
      for( let i=0; i< n; i++ ){
        const index: number = _.findIndex( this.selectedTurn.roll, { active: true } );
        // index == roll index
        // die_k is the dice
        // i is the number, should be 1 ..6
        if( _.gte( index, 0 ) ){
          let id = this.buildDiceId( index, "die_"+k, i );
          s += "<button mat-icon-button id="+id+" (click)='unsetDie( "+id+" )' class='die-type'><img src='assets/icons/svg/dice_"+k+".svg' /></button>"; 
        }
      }
    });
    return s;
  };

  // set the datasource to the active/selected Turn
  private setPlayerDataSource( turn: TurnClass ) {
    this.playerDataSource = new MatTableDataSource< RollClass >( turn.roll );
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.playerDataSource.sort = this.sort;
  };

};
