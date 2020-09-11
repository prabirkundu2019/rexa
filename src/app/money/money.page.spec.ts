import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyPage } from './money.page';

describe('MoneyPage', () => {
  let component: MoneyPage;
  let fixture: ComponentFixture<MoneyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
