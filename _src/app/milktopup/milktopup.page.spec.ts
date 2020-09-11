import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilktopupPage } from './milktopup.page';

describe('MilktopupPage', () => {
  let component: MilktopupPage;
  let fixture: ComponentFixture<MilktopupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilktopupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilktopupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
