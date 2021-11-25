import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerScoreboardComponent } from './player-scoreboard.component';

describe('PlayerScoreboardComponent', () => {
  let component: PlayerScoreboardComponent;
  let fixture: ComponentFixture<PlayerScoreboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerScoreboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerScoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
