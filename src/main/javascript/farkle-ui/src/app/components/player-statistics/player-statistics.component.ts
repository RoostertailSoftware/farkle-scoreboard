import { Component } from '@angular/core';

import { PlayersService } from '@/app/shared/services';
import { StatisticsClass, PlayerClass } from '@/app/shared/classes';

import * as _ from "lodash";

@Component({
  selector: 'app-player-statistics',
  templateUrl: './player-statistics.component.html',
  styleUrls: ['./player-statistics.component.scss']
})
export class PlayerStatisticsComponent  {

  activePlayer: PlayerClass;
  activePlayerStats: StatisticsClass;

  playerObserver: any;
  playerObserverResult: any;
  constructor( private playerSvc: PlayersService ) { 

    this.activePlayer = null;
    this.playerObserver = this.playerSvc.getObservableData();
    this.playerObserverResult = this.playerObserver.subscribe( this.getData );
    this.activePlayerStats = null;
  };

  getData = ( result: Array< PlayerClass > ) => {
    let i = _.findIndex( result, { active: true });
    if( _.gte( i, 0 ) ) {
      this.activePlayer = result[ i ];
      this.activePlayerStats = new StatisticsClass( this.activePlayer.game );
      this.activePlayerStats.runStats();
    }
  }

}
