import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridBackendComponent } from './grid-backend.component';

describe('GridBackendComponent', () => {
  let component: GridBackendComponent;
  let fixture: ComponentFixture<GridBackendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridBackendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridBackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
