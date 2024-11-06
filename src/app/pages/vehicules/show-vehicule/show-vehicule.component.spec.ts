import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVehiculeComponent } from './show-vehicule.component';

describe('ShowVehiculeComponent', () => {
  let component: ShowVehiculeComponent;
  let fixture: ComponentFixture<ShowVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowVehiculeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
