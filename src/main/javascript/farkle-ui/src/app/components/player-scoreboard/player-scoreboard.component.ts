import { Component, OnInit } from '@angular/core';
import { PlayersService } from '@services';

import { PlayerClass } from '@classes';
@Component({
  selector: 'app-player-scoreboard',
  templateUrl: './player-scoreboard.component.html',
  styleUrls: ['./player-scoreboard.component.scss']
})
export class PlayerScoreboardComponent implements OnInit {

  playerDataSource:any;
  displayedColumns: Array< string >;
  constructor( private playerSvc: PlayersService) {
    let x = playerSvc.getObservableData();
    x.subscribe( result =>{
      this.playerDataSource = result;
    });

    this.displayedColumns = [ 'place', 'player', 'score'];
   }

  ngOnInit(): void {
    let x = new PlayerClass("John", 0);
    let y = x.game.getNextTurn();
    let z = y.getNextRoll();

    this.playerSvc.register( x );
  }

}
