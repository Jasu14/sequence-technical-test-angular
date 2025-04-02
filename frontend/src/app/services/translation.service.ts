import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor(private translate: TranslateService) { }

  handleTranslation() {
    this.translate.setDefaultLang('es');

    var languageUser = localStorage.getItem('user-language');

    if(languageUser) {
      this.translate.use(languageUser);
    } else {
      var userLanguaje = navigator.language.split('-')[0]; // Avoid regional differences
      this.translate.use(userLanguaje);
      localStorage.setItem('user-language', userLanguaje);
    }
  }
}
