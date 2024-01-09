import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EIuranPage } from './e-iuran.page';

describe('EIuranPage', () => {
  let component: EIuranPage;
  let fixture: ComponentFixture<EIuranPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EIuranPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
