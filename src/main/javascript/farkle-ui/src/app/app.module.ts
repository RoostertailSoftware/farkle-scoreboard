import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


import { AngularMaterialModule } from "./angular-material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";

let _imports: any[] = [
  CommonModule,
  AngularMaterialModule,
  BrowserModule,
  BrowserAnimationsModule,
  FormsModule,
  ReactiveFormsModule
];

let _schemas: any[] =[ ]

/* -- `declare` components here -- */

import { AppComponent,
  AboutDialogComponent,
  HelpInfoButtonsComponent,
  PlayerScoreboardComponent,
  PlayerStatisticsComponent,
  RollActionButtonsComponent,
  RollScoreboardComponent,
  RulesConfigurationDialogComponent,
  RulesDialogComponent,
  StartSetupButtonsComponent,
  TitleComponent } from './components' ;

  import { safeHtml } from "@pipes";

let _declarations: any[] = [
  AppComponent,
  AboutDialogComponent,
  HelpInfoButtonsComponent,
  PlayerScoreboardComponent,
  PlayerStatisticsComponent,
  RollActionButtonsComponent,
  RollScoreboardComponent,
  RulesConfigurationDialogComponent,
  RulesDialogComponent,
  StartSetupButtonsComponent,
  TitleComponent,
  safeHtml
]

/* -- Services -- */
import {   ConfigurationService,
      PlayersService } from "@services";

let _providers: any[ ] = [
  ConfigurationService,
  PlayersService,
  { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: "fill", floatLabel: "always" } }
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
