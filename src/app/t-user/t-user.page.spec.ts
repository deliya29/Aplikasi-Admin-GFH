import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TUserPage } from './t-user.page';

describe('TUserPage', () => {
  let component: TUserPage;
  let fixture: ComponentFixture<TUserPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
