import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxPrepareRegisterComponent } from './tax-prepare-register.component';

describe('TaxPrepareRegisterComponent', () => {
  let component: TaxPrepareRegisterComponent;
  let fixture: ComponentFixture<TaxPrepareRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxPrepareRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxPrepareRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
