import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTypeComponent } from './update-type.component';

describe('UpdateTypeComponent', () => {
  let component: UpdateTypeComponent;
  let fixture: ComponentFixture<UpdateTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
