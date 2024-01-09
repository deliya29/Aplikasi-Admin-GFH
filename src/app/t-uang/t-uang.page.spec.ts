import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TUangPage } from './t-uang.page';

describe('TUangPage', () => {
  let component: TUangPage;
  let fixture: ComponentFixture<TUangPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TUangPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
