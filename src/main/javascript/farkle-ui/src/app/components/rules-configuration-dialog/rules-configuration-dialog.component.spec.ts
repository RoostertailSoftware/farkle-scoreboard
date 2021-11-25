import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesConfigurationDialogComponent } from './rules-configuration-dialog.component';

describe('RulesConfigurationDialogComponent', () => {
  let component: RulesConfigurationDialogComponent;
  let fixture: ComponentFixture<RulesConfigurationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RulesConfigurationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesConfigurationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
