import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


import { AngularMaterialModule } from "./angular-material.module";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";

let _imports: any[] = [
  CommonModule,
  AngularMaterialModule,
  HttpClientModule,
  BrowserModule,
  BrowserAnimationsModule,
  FormsModule,
  ReactiveFormsModule
];

let _schemas: any[] =[ ]

/* -- `declare` components here -- */

import { AppComponent,
  AboutDialogComponent,
  AddPlayerDialogComponent,
  HelpInfoButtonsComponent,
  PlayerRollTableComponent,
  PlayerScoreboardComponent,
  PlayerStatisticsComponent,
  PlayerTurnTableComponent,
  PregameActionButtonsComponent,
  RollActionButtonsComponent,
  RollScoreboardComponent,
  RulesConfigurationDialogComponent,
  RulesDialogComponent,
  TitleComponent } from './components' ;

  import { englishOrdinalPipe, 
    safeHtml } from "@pipes";

let _declarations: any[] = [
  AppComponent,
  AboutDialogComponent,
  AddPlayerDialogComponent,
  HelpInfoButtonsComponent,
  PlayerRollTableComponent,
  PlayerScoreboardComponent,
  PlayerStatisticsComponent,
  PlayerTurnTableComponent,
  PregameActionButtonsComponent,
  RollActionButtonsComponent,
  RollScoreboardComponent,
  RulesConfigurationDialogComponent,
  RulesDialogComponent,
  TitleComponent,
  englishOrdinalPipe,
  safeHtml
]

/* -- Services -- */
import {   ConfigurationService,
    GameMasterService,
    PlayersService } from "@services";

let _providers: any[ ] = [
  ConfigurationService,
  GameMasterService,
  PlayersService,
  { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: "fill", floatLabel: "auto" } }
]

let _bootstrap: any[] = [
  AppComponent
];

@NgModule({
  declarations: _declarations,
  imports: _imports,
  providers: _providers,
  bootstrap: _bootstrap,
  schemas: _schemas
})
export class AppModule { }
