import { Locale } from 'expo-localization';
import dayjs from 'hooks/i18n/lib/dayjs';

import { Dict, Leaves } from './utils';

interface I18nOptions {
  defaultLocale: Locale;
  interpolationPrefix: string;
  interpolationSuffix: string;
  referencePrefix: string;
  referenceSuffix: string;
}

const DEFAULT_I18N_OPTIONS: I18nOptions = {
  defaultLocale: {
    languageCode: 'en',
    languageTag: 'en-US',
    currencyCode: 'USD',
    currencySymbol: '$',
    regionCode: 'US',
    decimalSeparator: '.',
    digitGroupingSeparator: ' ',
    measurementSystem: 'metric',
    textDirection: 'ltr',
  },
  interpolationPrefix: '{{',
  interpolationSuffix: '}}',
  referencePrefix: '[[',
  referenceSuffix: ']]',
} as const;

export class I18n<T extends Dict<unknown>> {
  private locale: Locale;
  private translations: Dict<T>;
  private interpolationPrefix: string;
  private interpolationSuffix: string;
  private referencePrefix: string;
  private referenceSuffix: string;

  constructor(translations: Dict<T>, options: Partial<I18nOptions> = {}) {
    const {
      defaultLocale,
      interpolationPrefix,
      interpolationSuffix,
      referencePrefix,
      referenceSuffix,
    }: I18nOptions = {
      ...DEFAULT_I18N_OPTIONS,
      ...options,
    };

    this.translations = translations;
    this.locale = defaultLocale;
    this.interpolationPrefix = interpolationPrefix;
    this.interpolationSuffix = interpolationSuffix;
    this.referencePrefix = referencePrefix;
    this.referenceSuffix = referenceSuffix;
  }

  t(key: Leaves<T>): string {
    let code: string = this.locale.languageCode;
    if (this.locale.languageCode in this.translations) {
      code = this.locale.languageCode;
    }
    const base = this.translations[code];

    let translation: any = key.split('.').reduce((p, c) => p?.[c], base) || key;

    // replace references
    let startindex = translation.indexOf(this.referencePrefix);
    let endindex = translation.indexOf(this.referenceSuffix, startindex);
    while (startindex !== -1 && endindex !== -1 && endindex > startindex) {
      const adjustedEndIndex = endindex + this.referencePrefix.length;
      const adjustedStartIndex = startindex + this.referencePrefix.length;
      const referenceName = translation.substring(adjustedStartIndex, endindex);

      const referenced = referenceName
        .split('.')
        .reduce((p, c) => p?.[c], base);

      translation =
        translation.slice(0, startindex) +
        referenced +
        translation.slice(adjustedEndIndex);

      startindex = translation.indexOf(this.referencePrefix);
      endindex = translation.indexOf(this.referenceSuffix);
    }

    return translation;
  }

  date(date: string | number | Date | dayjs.Dayjs, format: string): string {
    return dayjs(date).locale(this.locale.languageCode).format(format);
  }

  dayjs(date: string | number | Date | dayjs.Dayjs) {
    return dayjs(date).locale(this.locale.languageCode);
  }

  setLocale(locale: Locale) {
    this.locale = locale;
  }

  getLocale(): Locale {
    return this.locale;
  }
}
