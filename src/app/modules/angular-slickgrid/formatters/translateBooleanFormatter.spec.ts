import { TestBed } from '@angular/core/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { translateBooleanFormatter } from './translateBooleanFormatter';
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

  it('should return an empty string null value is passed', () => {
    translate.use('en');
    gridMock.getOptions.mockReturnValueOnce({
      i18n: translate
    });
    const output = translateBooleanFormatter(1, 1, null, {} as Column, {}, gridMock);
    expect(output).toBe('');
  });

  it('should return the translated value when value passed is boolean', () => {
    translate.setTranslation('fr', { TRUE: 'Vrai', FALSE: 'Faux' });
    translate.use('fr');
    gridMock.getOptions.mockReturnValueOnce({
      i18n: translate
    });
    const output = translateBooleanFormatter(1, 1, true, {} as Column, {}, gridMock);
    expect(output).toBe('Vrai');
  });

  it('should return the translated value when value passed is a string', () => {
    translate.setTranslation('fr', { TRUE: 'Vrai', FALSE: 'Faux' });
    translate.use('fr');
    gridMock.getOptions.mockReturnValueOnce({
      i18n: translate
    });
    const output = translateBooleanFormatter(1, 1, 'true', {} as Column, {}, gridMock);
    expect(output).toBe('Vrai');
  });
});
