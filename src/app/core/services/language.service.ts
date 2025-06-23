import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  currentLanguage = signal<string>('en');
  isRTL = signal<boolean>(false);
  constructor(private translate: TranslateService) {
    this.initLanguage();
  }
  initLanguage(): void {
    this.translate.setDefaultLang('en');
    const savedLang = localStorage.getItem('language') || 'en';
    this.setLanguage(savedLang);
  }
  setLanguage(lang: string): void {
    this.currentLanguage.set(lang);
    this.isRTL.set(lang === 'ar');
    this.translate.use(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }
  toggleLanguage(): void {
    const newLang = this.currentLanguage() === 'en' ? 'ar' : 'en';
    this.setLanguage(newLang);
  }
}
