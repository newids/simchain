import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailviewComponent } from './detailview.component';

describe('DetailviewComponent', () => {
  let component: DetailviewComponent;
  let fixture: ComponentFixture<DetailviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
