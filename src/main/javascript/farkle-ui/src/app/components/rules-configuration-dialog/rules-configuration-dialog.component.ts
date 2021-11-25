import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { RulesConfigurationClass, AppSettingsClass } from "@classes";

import * as _ from "lodash";
@Component({
  selector: 'app-rules-configuration-dialog',
  templateUrl: './rules-configuration-dialog.component.html',
  styleUrls: ['./rules-configuration-dialog.component.scss']
})
export class RulesConfigurationDialogComponent implements OnInit {

  public configurationForm: FormGroup;
  public title = "game configuration"
  private gameStarted: boolean = false;

  constructor( public dialogRef: MatDialogRef< RulesConfigurationDialogComponent >, 
      @Inject( MAT_DIALOG_DATA ) public rules: RulesConfigurationClass ) {   }

  
  ngOnInit(): void {
    this.configurationForm = this.resetConfigForm();

    // Subscribe the changes in `maxFarklesApplies` so we can set/reset the values as needed;

    this.configurationForm.get( 'maxFarklesApplies' ).valueChanges.subscribe( ( result: boolean ) => {
      const patch: any = {
        maxFarkleCount: result ?    AppSettingsClass.MAX_FARKLE_ROLLS: 0,
        maxFarklePenality: result ? AppSettingsClass.MAX_FARKLE_PENALTY: 0
      };
      this.configurationForm.patchValue( patch );
    });
  }

  resetConfigForm(): FormGroup {

    // Build the form from the rules data received.
    //
     let form: FormGroup = new FormGroup({
      winScore: 
        new FormControl( { value: this.rules.winScore,  disabled: this.gameStarted }, [ Validators.required ] ),

      minScoreToStart:  
        new FormControl( { value: this.rules.minScoreToStart, disabled: this.gameStarted }, [ Validators.required ] ),

      nextPlayerContinuesPreviousRoll:  
        new FormControl( { value: this.rules.nextPlayerContinuesPreviousRoll, disabled: this.gameStarted }, [ Validators.required ] ),

      doublingScoresOnTripples: 
        new FormControl( { value: this.rules.doublingScoresOnTripples,  disabled: this.gameStarted }, [ Validators.required ] ),

      trippleDoublePoints:  
        new FormControl( { value: this.rules.trippleDoublePoints, disabled: this.gameStarted }, [ Validators.required ] ),

      straightPoints: 
        new FormControl( { value: this.rules.straightPoints,  disabled: this.gameStarted }, [ Validators.required ] ),

      maxFarklesApplies:  
        new FormControl( { value: this.rules.maxFarklesApplies, disabled: this.gameStarted }, [ Validators.required ] ),

      maxFarkleCount: 
      new FormControl( { value: this.rules.maxFarkleCount,  disabled: this.gameStarted }, [ Validators.required ] ),

      maxFarklePenality:  
        new FormControl( { value: this.rules.maxFarklePenality, disabled: this.gameStarted }, [ Validators.required ] ),
    });

    return form;
  };

  close = () => {
    this.dialogRef.close( this.configurationForm.getRawValue() );
  }
  default = () =>{
    this.rules = new RulesConfigurationClass();
    this.configurationForm  = this.resetConfigForm();
  }
}
