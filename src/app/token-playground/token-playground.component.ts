import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-token-playground',
  standalone: true,
  templateUrl: './token-playground.component.html',
  styleUrls: ['./token-playground.component.scss'],
  imports: [],
})
export class TokenPlaygroundComponent {
  isDark = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
  ) {}

  toggleTheme() {
    this.isDark = !this.isDark;
    if (this.isDark) {
      this.renderer.addClass(this.document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(this.document.body, 'dark-theme');
    }
  }
}
