import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuillsPlaygroundComponent } from './quills-playground/quills-playground.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, QuillsPlaygroundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pkcg-playground';
}
