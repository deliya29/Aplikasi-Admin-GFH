import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuratMasukPage } from './surat-masuk.page';

describe('SuratMasukPage', () => {
  let component: SuratMasukPage;
  let fixture: ComponentFixture<SuratMasukPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SuratMasukPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
