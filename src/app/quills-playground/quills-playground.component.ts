import { Component, ElementRef, ViewChild } from '@angular/core';
import { JsonPipe } from '@angular/common';
import Quill from 'quill';
import 'quill/dist/quill.core.css';

@Component({
  selector: 'app-quills-playground',
  imports: [JsonPipe],
  templateUrl: './quills-playground.component.html',
  styleUrl: './quills-playground.component.scss',
  standalone: true,
})
export class QuillsPlaygroundComponent {
  @ViewChild('editorContainer') editorContainer!: ElementRef;
  @ViewChild('toolbar') toolbar!: ElementRef;
  public quillTheme: 'snow' | 'bubble' = 'snow';
  private quill: Quill | null = null;

  // Inspector Data
  public editorContent = '';
  public editorText = '';
  public editorDelta: any = null;
  public selectionRange: any = null;

  constructor() {}

  ngAfterViewInit() {
    this.initializeQuill();
  }

  initializeQuill() {
    const editorDiv = document.createElement('div');
    this.editorContainer.nativeElement.appendChild(editorDiv);

    // Prepare Modules
    const modules: any = {
      table: true,
    };

    // Configure Toolbar only for Snow theme
    if (this.quillTheme === 'snow' && this.toolbar) {
      // Reset classes to prevent "ql-snow ql-bubble" conflicts or missing classes
      this.toolbar.nativeElement.className = '';

      modules.toolbar = {
        container: this.toolbar.nativeElement,
        handlers: {
          star: () => {
            const range = this.quill?.getSelection();
            if (range) {
              this.quill?.insertText(range.index, '★');
            }
          },
          table: () => {
            const table = this.quill?.getModule('table') as any;
            table.insertTable(3, 3);
          },
        },
      };
    }

    this.quill = new Quill(editorDiv, {
      modules: modules,
      placeholder: 'Compose an epic...',
      theme: this.quillTheme,
    });

    // Initial Data
    this.updateInspector();

    // Event Listeners
    this.quill.on('text-change', () => this.updateInspector());
    this.quill.on('selection-change', (range) => {
      this.selectionRange = range;
    });
  }
  updateInspector() {
    if (!this.quill) return;
    this.editorContent = this.quill.root.innerHTML;
    this.editorText = this.quill.getText();
    this.editorDelta = this.quill.getContents();
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
      // Manually trigger update since setContents doesn't always fire text-change in the same way for init
      this.updateInspector();
    }
  }
}
