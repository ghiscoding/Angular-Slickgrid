jest.unmock('jquery');
jest.unmock('jquery-ui');
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AngularSlickgridComponent } from './angular-slickgrid.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AngularSlickgridComponent
      ],
      providers: [],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AngularSlickgridComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Angular SlickGrid Demo'`, async(() => {
    const fixture = TestBed.createComponent(AngularSlickgridComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Angular SlickGrid Demo');
  }));
});
