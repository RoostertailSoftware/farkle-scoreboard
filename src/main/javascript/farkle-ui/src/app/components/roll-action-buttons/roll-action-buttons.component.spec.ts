import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollActionButtonsComponent } from './roll-action-buttons.component';

describe('RollActionButtonsComponent', () => {
  let component: RollActionButtonsComponent;
  let fixture: ComponentFixture<RollActionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollActionButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RollActionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
