import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TambahPendudukPage } from './tambah-penduduk.page';

describe('TambahPendudukPage', () => {
  let component: TambahPendudukPage;
  let fixture: ComponentFixture<TambahPendudukPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TambahPendudukPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
