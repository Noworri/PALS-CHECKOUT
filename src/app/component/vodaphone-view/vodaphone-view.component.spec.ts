import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VodaphoneViewComponent } from './vodaphone-view.component';

describe('VodaphoneViewComponent', () => {
  let component: VodaphoneViewComponent;
  let fixture: ComponentFixture<VodaphoneViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VodaphoneViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VodaphoneViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
