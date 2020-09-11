import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakemoneyPage } from './makemoney.page';

describe('MakemoneyPage', () => {
  let component: MakemoneyPage;
  let fixture: ComponentFixture<MakemoneyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakemoneyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakemoneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
