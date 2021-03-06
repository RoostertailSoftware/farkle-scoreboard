import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { AddPlayerDialogComponent } from '@components';
import { PlayersService } from '@services';
import { PlayerClass } from '@classes';

import * as _ from "lodash";

@Component({
  selector: 'app-pregame-action-buttons',
  templateUrl: './pregame-action-buttons.component.html',
  styleUrls: ['./pregame-action-buttons.component.scss']
})
export class PregameActionButtonsComponent implements OnInit {

  @Output() playHasBegun = new EventEmitter< boolean >( );

  playerObservable:any;
  playerData: Array< PlayerClass >;
  tooltip: any;
  
  constructor( private playerSvc: PlayersService, private addPersonDialog: MatDialog ) { 
    this.playerObservable =  this.playerSvc.getObservableData();
    this.playerObservable.subscribe( result => {
      this.playerData = result;
    })
  }

  ngOnInit(): void {
    this.tooltip = {
      beginPlay: { tip: "start the game" },
      addPlayer: { tip: "add a player to the game" }
    };
  }

  // The use has chosen to start the game with the player(s)
  // keep from modifying the db.
  beginPlay():void {
    this.playHasBegun.emit( true );
  }

  // Method to open the dialog for creating a player, then
  // taking the result and adding it to the player service.
  addPlayer( keepGoing?: boolean ):void {
    let x:any = {};
    x.addAnother = _.isUndefined( keepGoing ) ? false : keepGoing;
    x.allowSinglePlayer = _.gt( this.playerData.length, 0 ) ? false : true; 
    let dialogRef: MatDialogRef< AddPlayerDialogComponent > = this.openDialog( x );
    // this is how to subscribe the the Dialog's @Output()
    // squeeee!
    dialogRef.componentInstance.player.subscribe( result => {
        let player: PlayerClass = new PlayerClass( result.name, this.playerData.length+1 );
        this.playerSvc.register( player );
        if ( result.singlePlayer ){
          this.beginPlay();
        }
    });
  };

  // Helper method to create a MatDialogRef for the dialog.
  openDialog( inData: any  ): MatDialogRef< AddPlayerDialogComponent  > {

    return this.addPersonDialog.open( AddPlayerDialogComponent, {
      autoFocus: true,
      closeOnNavigation: true,
      data: inData
    } );
  }

}
