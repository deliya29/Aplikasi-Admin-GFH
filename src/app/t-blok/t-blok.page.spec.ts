import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TBlokPage } from './t-blok.page';

describe('TBlokPage', () => {
  let component: TBlokPage;
  let fixture: ComponentFixture<TBlokPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TBlokPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
