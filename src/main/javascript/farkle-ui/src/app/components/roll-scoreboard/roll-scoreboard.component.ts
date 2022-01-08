import { Component, Input } from '@angular/core';

import { PlayersService } from '@/app/shared/services';
import { PlayerClass, TurnClass } from '@/app/shared/classes';

import * as _ from "lodash";

@Component({
  selector: 'app-roll-scoreboard',
  templateUrl: './roll-scoreboard.component.html',
  styleUrls: ['./roll-scoreboard.component.scss']
})
export class RollScoreboardComponent {

  
  playerObserver: any;
  activePlayer: PlayerClass;
  selectedTurn: TurnClass;

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
    };
    
  };

  // a Turn is selected or created (active) from the
  // <app-player-turn-table>. this changes the [selectedTurn] on
  // <app-player-roll-table>
  turnSelected( event: TurnClass ){
    this.selectedTurn = event;
  }

}
