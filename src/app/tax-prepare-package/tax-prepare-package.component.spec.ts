import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxPreparePackageComponent } from './tax-prepare-package.component';

describe('TaxPreparePackageComponent', () => {
  let component: TaxPreparePackageComponent;
  let fixture: ComponentFixture<TaxPreparePackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxPreparePackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxPreparePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
