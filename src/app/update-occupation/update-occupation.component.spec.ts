import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOccupationComponent } from './update-occupation.component';

describe('UpdateOccupationComponent', () => {
  let component: UpdateOccupationComponent;
  let fixture: ComponentFixture<UpdateOccupationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateOccupationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOccupationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
