import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as _ from 'lodash';

@Component({
  selector: 'app-add-person-dialog',
  templateUrl: './add-person-dialog.component.html',
  styleUrls: ['./add-person-dialog.component.scss']
})
export class AddPersonDialogComponent implements OnInit {

  public newPersonForm: FormGroup;
  public title = "game configuration"

  constructor( public dialogRef: MatDialogRef< AddPersonDialogComponent > , 
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
