import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceedCashOutComponent } from './proceed-cash-out.component';

describe('ProceedCashOutComponent', () => {
  let component: ProceedCashOutComponent;
  let fixture: ComponentFixture<ProceedCashOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProceedCashOutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProceedCashOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
