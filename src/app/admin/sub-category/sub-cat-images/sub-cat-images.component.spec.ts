import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCatImagesComponent } from './sub-cat-images.component';

describe('SubCatImagesComponent', () => {
  let component: SubCatImagesComponent;
  let fixture: ComponentFixture<SubCatImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubCatImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCatImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
