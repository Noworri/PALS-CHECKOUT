import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirteltigoViewComponent } from './airteltigo-view.component';

describe('AirteltigoViewComponent', () => {
  let component: AirteltigoViewComponent;
  let fixture: ComponentFixture<AirteltigoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirteltigoViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AirteltigoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
