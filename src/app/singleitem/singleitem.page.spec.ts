import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleitemPage } from './singleitem.page';

describe('SingleitemPage', () => {
  let component: SingleitemPage;
  let fixture: ComponentFixture<SingleitemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleitemPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleitemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
