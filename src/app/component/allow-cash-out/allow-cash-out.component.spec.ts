import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowCashOutComponent } from './allow-cash-out.component';

describe('AllowCashOutComponent', () => {
  let component: AllowCashOutComponent;
  let fixture: ComponentFixture<AllowCashOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllowCashOutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllowCashOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
