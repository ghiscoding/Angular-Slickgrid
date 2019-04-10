import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { translateFormatter } from './translateFormatter';
import { Column } from '../models';

describe('the Translate Formatter', () => {
  let translate: TranslateService;

  // mock methods of the Template Data Service
  const gridMock = {
    getOptions: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()]
    });
    translate = TestBed.get(TranslateService);
  });

  it('should return an empty string when no value is passed', () => {
    translate.use('en');
    gridMock.getOptions.mockReturnValueOnce({
      i18n: translate
    });
    const output = translateFormatter(1, 1, '', {} as Column, {}, gridMock);
    expect(output).toBe('');
  });

  it('should return the translated value as string', () => {
    translate.setTranslation('fr', { HELLO: 'Bonjour', WORLD: 'Monde' });
    translate.use('fr');
    gridMock.getOptions.mockReturnValueOnce({
      i18n: translate
    });
    const output = translateFormatter(1, 1, 'HELLO', {} as Column, {}, gridMock);
    expect(output).toBe('Bonjour');
  });
});
