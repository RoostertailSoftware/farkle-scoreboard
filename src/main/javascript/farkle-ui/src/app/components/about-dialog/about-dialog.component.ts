import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.scss']
})
export class AboutDialogComponent implements OnInit {

  public title: string;
  constructor() { 
    this.title = "about Farkle scoreboard"
  }

  ngOnInit(): void {
  }

}
