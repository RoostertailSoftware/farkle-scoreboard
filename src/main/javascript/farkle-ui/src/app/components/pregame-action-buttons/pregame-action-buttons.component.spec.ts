import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregameActionButtonsComponent } from './pregame-action-buttons.component';

describe('PregameActionButtonsComponent', () => {
  let component: PregameActionButtonsComponent;
  let fixture: ComponentFixture<PregameActionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregameActionButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregameActionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
