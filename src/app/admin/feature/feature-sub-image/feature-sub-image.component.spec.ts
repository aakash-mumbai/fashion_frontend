import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureSubImageComponent } from './feature-sub-image.component';

describe('FeatureSubImageComponent', () => {
  let component: FeatureSubImageComponent;
  let fixture: ComponentFixture<FeatureSubImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureSubImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureSubImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
