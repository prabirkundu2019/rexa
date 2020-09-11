import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainnotificationPage } from './mainnotification.page';

describe('MainnotificationPage', () => {
  let component: MainnotificationPage;
  let fixture: ComponentFixture<MainnotificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainnotificationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainnotificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
