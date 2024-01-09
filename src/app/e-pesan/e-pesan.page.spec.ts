import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EPesanPage } from './e-pesan.page';

describe('EPesanPage', () => {
  let component: EPesanPage;
  let fixture: ComponentFixture<EPesanPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EPesanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
