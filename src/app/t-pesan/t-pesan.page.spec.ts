import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TPesanPage } from './t-pesan.page';

describe('TPesanPage', () => {
  let component: TPesanPage;
  let fixture: ComponentFixture<TPesanPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TPesanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
