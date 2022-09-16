import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsuccesfullTransactionComponent } from './unsuccesfull-transaction.component';

describe('UnsuccesfullTransactionComponent', () => {
  let component: UnsuccesfullTransactionComponent;
  let fixture: ComponentFixture<UnsuccesfullTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsuccesfullTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnsuccesfullTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
