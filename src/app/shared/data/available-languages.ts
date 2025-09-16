import {ILanguage} from "../models/utils/language.model";

export const DEFAULT_LANGUAGE = 'fr';

export const availableLanguages: ILanguage[] = [
  {
    label: 'EN',
    value: 'en',
    img: 'assets/icon/en.png'
  },
  {
    label: 'FR',
    value: 'fr',
    img: 'assets/icon/fr.png'
  }
];
