import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyStepTwoComponent } from './survey-step-two.component';

describe('SurveyStepTwoComponent', () => {
  let component: SurveyStepTwoComponent;
  let fixture: ComponentFixture<SurveyStepTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyStepTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
