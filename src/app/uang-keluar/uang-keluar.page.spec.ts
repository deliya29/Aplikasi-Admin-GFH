import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UangKeluarPage } from './uang-keluar.page';

describe('UangKeluarPage', () => {
  let component: UangKeluarPage;
  let fixture: ComponentFixture<UangKeluarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UangKeluarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
