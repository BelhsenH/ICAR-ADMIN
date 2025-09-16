import {Injectable} from '@angular/core';
import {ILanguage} from "../../models/utils/language.model";
import {availableLanguages, DEFAULT_LANGUAGE} from "../../data/available-languages";
import {LocalStorageService} from "../storage/local-storage.service";
import {DateService} from "../date/date.service";
import {StorageKeys} from "../../../core/config/app.config";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private availableLanguages: ILanguage[] = availableLanguages;
  private selectedLanguageValue!: string;

  constructor(
    private dateService: DateService,
    private localStorageService: LocalStorageService
  ) {
  }

  getAvailableLanguages(): ILanguage[] {
    return [...this.availableLanguages];
  }

  initializeAppLanguage(): ILanguage {
    const storedLanguage: string | undefined = this.localStorageService.getData(StorageKeys.LANGUAGE);
    this.selectedLanguageValue = storedLanguage || DEFAULT_LANGUAGE;
    return this.updateAppLanguage(this.selectedLanguageValue);
  }

  updateAppLanguage(newLanguageValue: string): ILanguage {
    this.selectedLanguageValue = newLanguageValue;
    this.dateService.setDateLocaleUsedByMomentJsGlobally(this.selectedLanguageValue); // use newLanguageValue as a locale for MomentJs
    this.localStorageService.saveData(StorageKeys.LANGUAGE, this.selectedLanguageValue);
    return this.findLanguageByValue(this.selectedLanguageValue);
  }

  private findLanguageByValue(val: string): ILanguage {
    return this.availableLanguages.find(language => language.value === val)!;
  }

}
