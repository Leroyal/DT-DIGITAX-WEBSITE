import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxPrepareProfileComponent } from './tax-prepare-profile.component';

describe('TaxPrepareProfileComponent', () => {
  let component: TaxPrepareProfileComponent;
  let fixture: ComponentFixture<TaxPrepareProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxPrepareProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxPrepareProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
