import { Component, OnInit } from '@angular/core';

import { PlayersService } from '@services';
import { PlayerClass } from "@classes";

import * as _ from "lodash";

@Component({
  selector: 'app-roll-action-buttons',
  templateUrl: './roll-action-buttons.component.html',
  styleUrls: ['./roll-action-buttons.component.scss']
})
export class RollActionButtonsComponent implements OnInit {

  diceCount: number;

  playersObservable: any;
  constructor( private playerSvc: PlayersService ) { 
    this.reset();
    this.playersObservable = this.playerSvc.getObservableData();
    this.playersObservable.subscribe( (result: Array< PlayerClass >) =>{
      let x:PlayerClass  = result[0];
    })
  }

  ngOnInit(): void {
  }

  roll(){

  }

  farkle(){
    this.reset();
  }
  finished(){
    this.reset();
  }

  one(){
    this.decrement();
  }
  two(){
    this.decrement();
  }
  three(){
    this.decrement();
  }
  four(){
    this.decrement();
  }
  five(){
    this.decrement();
  }
  six(){
    this.decrement();
  }

  decrement(){
    this.diceCount -= 1;
    this.diceCount = _.eq( this.diceCount, 0 ) ? 6 : this.diceCount;
  };
  reset(){
    this.diceCount = 6;
  }
}
