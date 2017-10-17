import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridOdataComponent } from './grid-odata.component';

describe('GridOdataComponent', () => {
  let component: GridOdataComponent;
  let fixture: ComponentFixture<GridOdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridOdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridOdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
