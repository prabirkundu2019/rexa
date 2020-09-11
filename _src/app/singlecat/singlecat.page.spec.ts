import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglecatPage } from './singlecat.page';

describe('SinglecatPage', () => {
  let component: SinglecatPage;
  let fixture: ComponentFixture<SinglecatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglecatPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglecatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
