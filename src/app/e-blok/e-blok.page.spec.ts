import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EBlokPage } from './e-blok.page';

describe('EBlokPage', () => {
  let component: EBlokPage;
  let fixture: ComponentFixture<EBlokPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EBlokPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
