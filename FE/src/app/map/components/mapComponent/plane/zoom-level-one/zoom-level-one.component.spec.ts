import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomLevelOneComponent } from './zoom-level-one.component';

describe('ZoomLevelOneComponent', () => {
  let component: ZoomLevelOneComponent;
  let fixture: ComponentFixture<ZoomLevelOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoomLevelOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomLevelOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
