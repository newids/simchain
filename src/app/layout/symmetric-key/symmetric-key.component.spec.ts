import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymmetricKeyComponent } from './symmetric-key.component';

describe('SymmetricKeyComponent', () => {
  let component: SymmetricKeyComponent;
  let fixture: ComponentFixture<SymmetricKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymmetricKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymmetricKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
