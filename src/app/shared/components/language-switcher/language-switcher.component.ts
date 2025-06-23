import { Component } from '@angular/core';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: false,
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css'
})
export class LanguageSwitcherComponent {
  currentLanguage!: string;
  constructor(private languageService: LanguageService) {
     this.currentLanguage = this.languageService.currentLanguage();
  }
  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }
}
