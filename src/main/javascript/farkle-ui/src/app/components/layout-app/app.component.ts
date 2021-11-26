import { Component } from '@angular/core';

import { AppSettingsClass } from '@classes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title: string = AppSettingsClass.APP_NAME;
  gameStart: boolean = false;

  beginGame( event ){
    this.gameStart = event; 
  }
}
