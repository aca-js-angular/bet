import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetsAndDepositComponent } from './bets-and-deposit.component';

describe('BetsAndDepositComponent', () => {
  let component: BetsAndDepositComponent;
  let fixture: ComponentFixture<BetsAndDepositComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetsAndDepositComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetsAndDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
