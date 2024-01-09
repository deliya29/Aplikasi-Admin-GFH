import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EPendudukPage } from './e-penduduk.page';

describe('EPendudukPage', () => {
  let component: EPendudukPage;
  let fixture: ComponentFixture<EPendudukPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EPendudukPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
