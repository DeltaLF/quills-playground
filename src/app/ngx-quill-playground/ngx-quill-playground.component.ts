import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
import Quill from 'quill';
import tokens from '@tokens';

// Registering Custom Font Sizes based on our Tokens
const Size = Quill.import('attributors/style/size') as any;
Size.whitelist = ['0.875rem', '1rem', '1.125rem', '1.25rem', '1.5rem'];
Quill.register(Size, true);

@Component({
  selector: 'app-ngx-quill-playground',
  standalone: true,
  imports: [QuillEditorComponent, ReactiveFormsModule],
  templateUrl: './ngx-quill-playground.component.html',
  styleUrl: './ngx-quill-playground.component.scss'
})
export class NgxQuillPlaygroundComponent {
  editorControl = new FormControl('<h1>Welcome to NGX-Quill</h1><p>Try the custom <strong>Tokens</strong> for color and size!</p>');

  // Generate colors dynamically from the Design System tokens
  private getCoreColors(): string[] {
    const core = (tokens as any).color.core;
    const palettes = ['neutral', 'blue', 'teal', 'red'];
    const colors: string[] = [];

    palettes.forEach(palette => {
      if (core[palette]) {
        Object.values(core[palette]).forEach((token: any) => {
          colors.push(token.value);
        });
      }
    });
    return colors;
  }

  quillConfig = {
    toolbar: [
      ['bold'],
      [{ 'size': Size.whitelist }],
      [{ 'color': this.getCoreColors() }, { 'background': this.getCoreColors() }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'clean']
    ]
  };
}
