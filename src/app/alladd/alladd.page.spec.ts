import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlladdPage } from './alladd.page';

describe('AlladdPage', () => {
  let component: AlladdPage;
  let fixture: ComponentFixture<AlladdPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlladdPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlladdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
