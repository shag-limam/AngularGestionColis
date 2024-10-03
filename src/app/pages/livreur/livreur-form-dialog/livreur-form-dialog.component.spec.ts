import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreurFormDialogComponent } from './livreur-form-dialog.component';

describe('LivreurFormDialogComponent', () => {
  let component: LivreurFormDialogComponent;
  let fixture: ComponentFixture<LivreurFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivreurFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivreurFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
