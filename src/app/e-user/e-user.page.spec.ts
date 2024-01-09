import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EUserPage } from './e-user.page';

describe('EUserPage', () => {
  let component: EUserPage;
  let fixture: ComponentFixture<EUserPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
