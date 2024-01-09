import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EPengeluaranPage } from './e-pengeluaran.page';

describe('EPengeluaranPage', () => {
  let component: EPengeluaranPage;
  let fixture: ComponentFixture<EPengeluaranPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EPengeluaranPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
