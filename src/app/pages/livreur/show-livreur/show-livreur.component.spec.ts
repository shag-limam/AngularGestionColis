import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLivreurComponent } from './show-livreur.component';

describe('ShowLivreurComponent', () => {
  let component: ShowLivreurComponent;
  let fixture: ComponentFixture<ShowLivreurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowLivreurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
