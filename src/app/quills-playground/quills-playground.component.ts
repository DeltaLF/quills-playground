import { Component, ElementRef, ViewChild } from '@angular/core';
import Quill from 'quill';
import 'quill/dist/quill.core.css';

@Component({
  selector: 'app-quills-playground',
  imports: [],
  templateUrl: './quills-playground.component.html',
  styleUrl: './quills-playground.component.scss',
  standalone: true,
})
export class QuillsPlaygroundComponent {
  @ViewChild('editorContainer') editorContainer!: ElementRef;
  public quillTheme: 'snow' | 'bubble' = 'snow';
  private quill: Quill | null = null;

  constructor() {}

  ngAfterViewInit() {
    this.initializeQuill();
  }

  initializeQuill() {
    const editorDiv = document.createElement('div');
    this.editorContainer.nativeElement.appendChild(editorDiv);

    this.quill = new Quill(editorDiv, {
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block'],
        ],
      },
      placeholder: 'Compose an epic...',
      theme: this.quillTheme,
    });
  }

  ngDestroy() {
    if (this.quill) {
      this.quill = null;
    }
  }

  public switchQuillTheme() {
    const currentContents = this.quill?.getContents();

    // Clean up old instance and DOM
    this.editorContainer.nativeElement.innerHTML = '';

    // Switch theme
    this.quillTheme = this.quillTheme === 'snow' ? 'bubble' : 'snow';

    // Create fresh instance
    this.initializeQuill();

    if (currentContents) {
      this.quill?.setContents(currentContents);
    }
  }
}
