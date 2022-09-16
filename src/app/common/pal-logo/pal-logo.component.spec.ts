import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalLogoComponent } from './pal-logo.component';

describe('PalLogoComponent', () => {
  let component: PalLogoComponent;
  let fixture: ComponentFixture<PalLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PalLogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PalLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
