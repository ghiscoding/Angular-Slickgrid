import { Injectable, Optional } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslaterService as UniversalTranslateService } from '@slickgrid-universal/common';

/**
 * This is a Translate Service Wrapper for Slickgrid-Universal monorepo lib to work properly,
 * it must implement Slickgrid-Universal TranslaterService interface to work properly
 */
@Injectable()
export class TranslaterService implements UniversalTranslateService {
  constructor(@Optional() private readonly translateService: TranslateService) {}

  /**
   * Method to return the current language used by the App
   * @return {string} current language
   */
  getCurrentLanguage(): string {
    return this.translateService?.currentLang ?? '';
  }

  /**
   * Method to set the language to use in the App and Translate Service
   * @param {string} language
   * @return {Promise} output
   */
  async use(newLang: string): Promise<any> {
    return this.translateService?.use?.(newLang);
  }

  /**
   * Method which receives a translation key and returns the translated value assigned to that key
   * @param {string} translation key
   * @return {string} translated value
   */
  translate(translationKey: string): string {
    return this.translateService?.instant?.(translationKey || ' ') as string;
  }
}
