import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartSetupButtonsComponent } from './start-setup-buttons.component';

describe('StartSetupButtonsComponent', () => {
  let component: StartSetupButtonsComponent;
  let fixture: ComponentFixture<StartSetupButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartSetupButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartSetupButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
