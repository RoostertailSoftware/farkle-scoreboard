import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit{

  public theWorkingTitle: string;
  
  private _title;
  @Input() set workingTitle ( s: string ){
    this._title = s;
  }
  get workingTitle(){
    return this._title;
  }

  ngOnInit(): void {
    this.theWorkingTitle = this.workingTitle;
  }

}
