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

  _: any;
  activePlayer: PlayerClass;
  activePlayerStats: StatisticsClass;

  playerObserver: any;
  playerObserverResult: any;
  constructor( private playerSvc: PlayersService ) { 
    this._ = _;
    this.activePlayer = null;
    this.activePlayerStats = null;

    this.playerObserver = this.playerSvc.getObservableData();
    this.playerObserverResult = this.playerObserver.subscribe( this.getData );
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
