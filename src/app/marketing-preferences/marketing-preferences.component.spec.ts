import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingPreferencesComponent } from './marketing-preferences.component';

describe('MarketingPreferencesComponent', () => {
  let component: MarketingPreferencesComponent;
  let fixture: ComponentFixture<MarketingPreferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketingPreferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
