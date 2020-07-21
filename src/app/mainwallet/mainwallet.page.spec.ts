import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainwalletPage } from './mainwallet.page';

describe('MainwalletPage', () => {
  let component: MainwalletPage;
  let fixture: ComponentFixture<MainwalletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainwalletPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainwalletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
