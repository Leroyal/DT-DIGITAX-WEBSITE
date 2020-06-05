import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyStepThreeComponent } from './survey-step-three.component';

describe('SurveyStepThreeComponent', () => {
  let component: SurveyStepThreeComponent;
  let fixture: ComponentFixture<SurveyStepThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyStepThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyStepThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
