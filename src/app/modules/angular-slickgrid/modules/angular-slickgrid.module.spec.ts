import { describe, expect, it } from 'vitest';

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
    const angularSlickgridModuleWithProviders = AngularSlickgridModule.forRoot();
    expect(angularSlickgridModuleWithProviders.providers![0]).toEqual({ provide: 'config', useValue: {} });
  });

  it('should create an instance with providers via forRoot() with extra config options', () => {
    const angularSlickgridModuleWithProviders = AngularSlickgridModule.forRoot({ enableAutoResize: true });
    expect(angularSlickgridModuleWithProviders.providers![0]).toEqual({ provide: 'config', useValue: { enableAutoResize: true } });
  });
});
