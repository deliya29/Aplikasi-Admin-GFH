import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EUangPage } from './e-uang.page';

describe('EUangPage', () => {
  let component: EUangPage;
  let fixture: ComponentFixture<EUangPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EUangPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
