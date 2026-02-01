import { Component, signal, ViewChild, ElementRef } from '@angular/core';
import {
  QuillEditorComponent,
  ContentChange,
  SelectionChange,
} from 'ngx-quill';
import { CommonModule } from '@angular/common';
import Quill from 'quill';

@Component({
  selector: 'app-example-two',
  standalone: true,
  imports: [QuillEditorComponent, CommonModule],
  templateUrl: './example-two.component.html',
  styleUrl: './example-two.component.scss',
})
export class ExampleTwoComponent {
  @ViewChild('toolbar') toolbar!: ElementRef;

  isBold = signal(false);
  isItalic = signal(false);

  private quillInstance: Quill | null = null;

  modules = {
    toolbar: {
      container: '#custom-toolbar-2', // We will give our div this ID
    },
  };

  onEditorCreated(quill: any) {
    this.quillInstance = quill;
  }

  onSelectionChanged(event: SelectionChange) {
    if (!this.quillInstance) return;
  }
  onEditorChanged(event: ContentChange | SelectionChange) {
    // Either ContentChange or SelectionChange triggered
    if (!this.quillInstance) return;
    this.syncState();
  }

  onContentChanged(event: ContentChange) {
    // You can handle content changes here if needed
  }

  /**
   * Helper to sync our Signals with Quill's internal Truth.
   */
  private syncState() {
    if (!this.quillInstance) return;
    const formats = this.quillInstance.getFormat();
    this.isBold.set(!!formats['bold']);
    this.isItalic.set(!!formats['italic']);
  }

  toggleBold() {
    if (this.quillInstance) {
      const current = this.isBold();
      this.quillInstance.format('bold', !current);
      this.syncState();
    }
  }

  toggleItalic() {
    if (this.quillInstance) {
      const current = this.isItalic();
      this.quillInstance.format('italic', !current);
      this.syncState();
    }
  }
}
