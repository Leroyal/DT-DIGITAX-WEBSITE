import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxPrepareDocumentComponent } from './tax-prepare-document.component';

describe('TaxPrepareDocumentComponent', () => {
  let component: TaxPrepareDocumentComponent;
  let fixture: ComponentFixture<TaxPrepareDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxPrepareDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxPrepareDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
