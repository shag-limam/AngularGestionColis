import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLivreurComponent } from './list-livreur.component';

describe('ListLivreurComponent', () => {
  let component: ListLivreurComponent;
  let fixture: ComponentFixture<ListLivreurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListLivreurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
