import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as _ from 'lodash';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-add-player-dialog',
  templateUrl: './add-player-dialog.component.html',
  styleUrls: ['./add-player-dialog.component.scss']
})
export class AddPlayerDialogComponent implements OnInit {

  @Output() player = new EventEmitter < any >();

  public newPersonForm: FormGroup;
  public title = "game configuration"
  public showSinglePlayer: boolean;

  constructor( public dialogRef: MatDialogRef< AddPlayerDialogComponent > , 
    @Inject( MAT_DIALOG_DATA ) public data: any ){ 
      this.showSinglePlayer = true;
    }

  ngOnInit(): void {
    if( _.isNull( this.data ) ){
      this.data = { 
        addAnother: false,
        allowSinglePlayer: true }   
    };
    this.showSinglePlayer = this.data.allowSinglePlayer;

    this.newPersonForm = new FormGroup({
      name: 
        new FormControl( '', [ Validators.required ] ),
      addAnother:
        new FormControl( this.data.addAnother ),
      singlePlayer:
        new FormControl( false )
    } );
  }

  close(): void {
    this.showSinglePlayer = false;
    let x: boolean = this.newPersonForm.get( 'addAnother' ).value;
    if( x ){
      //send data back to parent and reset
      this.player.emit( this.newPersonForm.getRawValue() )
      this.newPersonForm.reset();
      this.newPersonForm.patchValue( 
        { 'addAnother': true }
      );
    } else {
      // send data back to parent and close
      this.player.emit( this.newPersonForm.getRawValue() )
      this.dialogRef.close( );
    };
  };

  singlePlayer( ):void {
    this.dialogRef.close();
    this.newPersonForm.setValue( { name: "you", addAnother: false, singlePlayer: true } );
    this.player.emit( this.newPersonForm.getRawValue() );
  };

};
