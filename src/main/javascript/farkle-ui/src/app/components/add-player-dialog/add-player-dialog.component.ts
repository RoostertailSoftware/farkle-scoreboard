import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as _ from 'lodash';

@Component({
  selector: 'app-add-player-dialog',
  templateUrl: './add-player-dialog.component.html',
  styleUrls: ['./add-player-dialog.component.scss']
})
export class AddPlayerDialogComponent implements OnInit {

  @Output() player = new EventEmitter < any >();

  public newPersonForm: FormGroup;
  public title = "game configuration"

  constructor( public dialogRef: MatDialogRef< AddPlayerDialogComponent > , 
    @Inject( MAT_DIALOG_DATA ) public data: any ){ }

  ngOnInit(): void {
    if( _.isNull( this.data ) ){
      this.data = false      
    }
    this.newPersonForm = new FormGroup({
      name: 
        new FormControl( '', [ Validators.required ] ),
      addAnother:
        new FormControl( this.data )
    } );
  }

  close = () => {
    let x: boolean = this.newPersonForm.get('addAnother').value;
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
    }
  }


}
