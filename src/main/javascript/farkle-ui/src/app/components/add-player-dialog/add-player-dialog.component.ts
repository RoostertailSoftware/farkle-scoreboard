import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as _ from 'lodash';

@Component({
  selector: 'app-add-player-dialog',
  templateUrl: './add-player-dialog.component.html',
  styleUrls: ['./add-player-dialog.component.scss']
})
export class AddPlayerDialogComponent implements OnInit {

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
    this.dialogRef.close( this.newPersonForm.getRawValue() );
  }
}
