import { AngularSlickgridModule } from './angular-slickgrid.module';

describe('AppComponent', () => {
  let angularSlickgridModule: AngularSlickgridModule;

  beforeEach(() => {
    angularSlickgridModule = new AngularSlickgridModule();
  });

  it('should create an instance', () => {
    expect(angularSlickgridModule).toBeTruthy();
  });

  it('should create an instance with providers via forRoot()', () => {
    const angularSlickgridModuleWithProviders = AngularSlickgridModule.forRoot({ enableAutoResize: true });
    expect(angularSlickgridModuleWithProviders.providers[0]).toEqual({ provide: 'config', useValue: { enableAutoResize: true } });
  });
});
