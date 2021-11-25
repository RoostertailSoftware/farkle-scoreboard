import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollScoreboardComponent } from './roll-scoreboard.component';

describe('RollScoreboardComponent', () => {
  let component: RollScoreboardComponent;
  let fixture: ComponentFixture<RollScoreboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollScoreboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RollScoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
