import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBirthdayComponent } from './update-birthday.component';

describe('UpdateBirthdayComponent', () => {
  let component: UpdateBirthdayComponent;
  let fixture: ComponentFixture<UpdateBirthdayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBirthdayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBirthdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
