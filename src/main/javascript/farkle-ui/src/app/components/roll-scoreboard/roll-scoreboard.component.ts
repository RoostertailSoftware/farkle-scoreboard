import { Component, Input } from '@angular/core';

import { PlayersService } from '@/app/shared/services';
import { DiceClass, PlayerClass } from '@/app/shared/classes';

import * as _ from "lodash";

@Component({
  selector: 'app-roll-scoreboard',
  templateUrl: './roll-scoreboard.component.html',
  styleUrls: ['./roll-scoreboard.component.scss']
})
export class RollScoreboardComponent {

  // this is the dice selection from the <roll-action-buttons>
  // This is really just passed on to the Child component
  // <app-player-roll-table [die]="die">
  // that app will detect changes and do something.
  @Input() die: DiceClass;

  playerObserver: any;
  activePlayer: PlayerClass;

  playerName: string;
  
  constructor( private playerSvc: PlayersService ) { 
    this.activePlayer = null;
    this.playerObserver = this.playerSvc.getObservableData();
    this.playerObserver.subscribe( this.getPlayerList );
  }


  private getPlayerList = ( result: Array< PlayerClass > ) => {
    let i = _.findIndex( result, { active: true });
    if( _.gte( i, 0 ) ) {
      this.activePlayer = result[ i ];
    };

    if( !_.isNull( this.activePlayer ) ) {
      this.playerName = this.activePlayer.name;
    }
  };

}
