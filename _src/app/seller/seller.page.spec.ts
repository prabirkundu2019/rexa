import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerPage } from './seller.page';

describe('SellerPage', () => {
  let component: SellerPage;
  let fixture: ComponentFixture<SellerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
