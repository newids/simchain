import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopWalletComponent } from './pop-wallet.component';

describe('PopWalletComponent', () => {
  let component: PopWalletComponent;
  let fixture: ComponentFixture<PopWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
