import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderitemdetailPage } from './orderitemdetail.page';

describe('OrderitemdetailPage', () => {
  let component: OrderitemdetailPage;
  let fixture: ComponentFixture<OrderitemdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderitemdetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderitemdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
