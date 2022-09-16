import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtnViewComponent } from './mtn-view.component';

describe('MtnViewComponent', () => {
  let component: MtnViewComponent;
  let fixture: ComponentFixture<MtnViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MtnViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MtnViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
