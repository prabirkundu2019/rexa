import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglecatitemsPage } from './singlecatitems.page';

describe('SinglecatitemsPage', () => {
  let component: SinglecatitemsPage;
  let fixture: ComponentFixture<SinglecatitemsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglecatitemsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglecatitemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
