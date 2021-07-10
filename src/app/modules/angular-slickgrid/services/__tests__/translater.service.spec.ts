import 'jest-extended';
import { TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { TranslaterService } from '../translater.service';

describe('Translater Service', () => {
  let translate: TranslateService;
  let service: TranslaterService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()]
    });
    translate = TestBed.inject(TranslateService);
    service = new TranslaterService(translate);

    translate.setTranslation('fr', {
      ITEMS: 'éléments',
      OF: 'de',
    });
    translate.setTranslation('en', {
      ITEMS: 'items',
      OF: 'of',
    });
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should call "use" method and expect "getCurrentLanguage" to be equal', async () => {
    await service.use('jp');
    expect(service.getCurrentLanguage()).toBe('jp');
  });

  it('should call "translate" and expect translated value returned', async () => {
    await service.use('fr');
    const output = service.translate('ITEMS');
    expect(output).toBe('éléments');
  });
});
