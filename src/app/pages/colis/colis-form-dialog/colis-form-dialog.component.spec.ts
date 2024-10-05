import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColisFormDialogComponent } from './colis-form-dialog.component';

describe('ColisFormDialogComponent', () => {
  let component: ColisFormDialogComponent;
  let fixture: ComponentFixture<ColisFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColisFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColisFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
