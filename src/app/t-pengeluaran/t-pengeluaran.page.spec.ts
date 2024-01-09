import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TPengeluaranPage } from './t-pengeluaran.page';

describe('TPengeluaranPage', () => {
  let component: TPengeluaranPage;
  let fixture: ComponentFixture<TPengeluaranPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TPengeluaranPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
