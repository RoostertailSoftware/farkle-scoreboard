import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpInfoButtonsComponent } from './help-info-buttons.component';

describe('HelpInfoButtonsComponent', () => {
  let component: HelpInfoButtonsComponent;
  let fixture: ComponentFixture<HelpInfoButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpInfoButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpInfoButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
