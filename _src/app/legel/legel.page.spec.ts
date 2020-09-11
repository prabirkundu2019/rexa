import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegelPage } from './legel.page';

describe('LegelPage', () => {
  let component: LegelPage;
  let fixture: ComponentFixture<LegelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
