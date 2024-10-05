import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowColisComponent } from './show-colis.component';

describe('ShowColisComponent', () => {
  let component: ShowColisComponent;
  let fixture: ComponentFixture<ShowColisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowColisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowColisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
