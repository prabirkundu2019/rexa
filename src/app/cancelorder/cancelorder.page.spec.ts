import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelorderPage } from './cancelorder.page';

describe('CancelorderPage', () => {
  let component: CancelorderPage;
  let fixture: ComponentFixture<CancelorderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelorderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelorderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
