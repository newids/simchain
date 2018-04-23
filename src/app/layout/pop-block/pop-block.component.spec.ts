import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopBlockComponent } from './pop-block.component';

describe('PopBlockComponent', () => {
  let component: PopBlockComponent;
  let fixture: ComponentFixture<PopBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
