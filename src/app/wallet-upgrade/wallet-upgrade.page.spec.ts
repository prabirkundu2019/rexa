import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletUpgradePage } from './wallet-upgrade.page';

describe('WalletUpgradePage', () => {
  let component: WalletUpgradePage;
  let fixture: ComponentFixture<WalletUpgradePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletUpgradePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletUpgradePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
