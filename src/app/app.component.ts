import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuillsPlaygroundComponent } from './quills-playground/quills-playground.component';
import { TokenPlaygroundComponent } from './token-playground/token-playground.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, QuillsPlaygroundComponent, TokenPlaygroundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pkcg-playground';
}
