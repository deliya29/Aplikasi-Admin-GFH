import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BPesanPage } from './b-pesan.page';

describe('BPesanPage', () => {
  let component: BPesanPage;
  let fixture: ComponentFixture<BPesanPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BPesanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
