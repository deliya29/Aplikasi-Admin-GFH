import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ESuratPage } from './e-surat.page';

describe('ESuratPage', () => {
  let component: ESuratPage;
  let fixture: ComponentFixture<ESuratPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ESuratPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
