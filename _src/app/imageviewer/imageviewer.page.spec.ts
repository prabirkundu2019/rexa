import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageviewerPage } from './imageviewer.page';

describe('ImageviewerPage', () => {
  let component: ImageviewerPage;
  let fixture: ComponentFixture<ImageviewerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageviewerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageviewerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
