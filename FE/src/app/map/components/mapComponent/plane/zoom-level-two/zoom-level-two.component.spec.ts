  import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomLevelTwoComponent } from './zoom-level-two.component';

describe('ZoomLevelTwoComponent', () => {
  let component: ZoomLevelTwoComponent;
  let fixture: ComponentFixture<ZoomLevelTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoomLevelTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomLevelTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
