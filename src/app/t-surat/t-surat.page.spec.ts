import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TSuratPage } from './t-surat.page';

describe('TSuratPage', () => {
  let component: TSuratPage;
  let fixture: ComponentFixture<TSuratPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TSuratPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
