import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivraisonFormDialogComponent } from './livraison-form-dialog.component';

describe('LivraisonFormDialogComponent', () => {
  let component: LivraisonFormDialogComponent;
  let fixture: ComponentFixture<LivraisonFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivraisonFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivraisonFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
