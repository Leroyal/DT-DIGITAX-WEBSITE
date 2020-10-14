import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninSecurityComponent } from './signin-security.component';

describe('SigninSecurityComponent', () => {
  let component: SigninSecurityComponent;
  let fixture: ComponentFixture<SigninSecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigninSecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
