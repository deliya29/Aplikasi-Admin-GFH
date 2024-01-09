import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TInfoPage } from './t-info.page';

describe('TInfoPage', () => {
  let component: TInfoPage;
  let fixture: ComponentFixture<TInfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
