import en from '../locales/en.json';

type LocaleDict = Record<string, string>;

const locales: Record<string, LocaleDict> = { en };

function loadLocale(lang: string): LocaleDict | undefined {
  return locales[lang];
}

export function t(key: string, params?: Record<string, string>, locale: string = 'en'): string {
  const dict = loadLocale(locale) ?? loadLocale('en');
  let value = dict?.[key] ?? key;
  if (params) {
    for (const [name, replacement] of Object.entries(params)) {
      value = value.replaceAll(`{${name}}`, replacement);
    }
  }
  return value;
}

export function getLocales(): string[] {
  return Object.keys(locales);
}
