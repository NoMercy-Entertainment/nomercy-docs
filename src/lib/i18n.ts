import en from '../locales/en.json';

type LocaleDict = Record<string, string>;

const locales: Record<string, LocaleDict> = { en };

function loadLocale(lang: string): LocaleDict | undefined {
  return locales[lang];
}

export function t(key: string, locale: string = 'en'): string {
  const dict = loadLocale(locale) ?? loadLocale('en');
  return dict?.[key] ?? key;
}

export function getLocales(): string[] {
  return Object.keys(locales);
}
