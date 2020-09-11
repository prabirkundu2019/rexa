import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateandreviewPage } from './rateandreview.page';

describe('RateandreviewPage', () => {
  let component: RateandreviewPage;
  let fixture: ComponentFixture<RateandreviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateandreviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateandreviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
