import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUserComponent } from './pop-user.component';

describe('PopUserComponent', () => {
  let component: PopUserComponent;
  let fixture: ComponentFixture<PopUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
