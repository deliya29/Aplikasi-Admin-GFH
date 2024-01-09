import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TIuranPage } from './t-iuran.page';

describe('TIuranPage', () => {
  let component: TIuranPage;
  let fixture: ComponentFixture<TIuranPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TIuranPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
