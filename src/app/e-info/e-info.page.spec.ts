import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EInfoPage } from './e-info.page';

describe('EInfoPage', () => {
  let component: EInfoPage;
  let fixture: ComponentFixture<EInfoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
