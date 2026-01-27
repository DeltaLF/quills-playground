import { Component, signal, ViewChild, ElementRef } from '@angular/core';
import {
  QuillEditorComponent,
  ContentChange,
  SelectionChange,
} from 'ngx-quill';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-example-two',
  standalone: true,
  imports: [QuillEditorComponent, CommonModule],
  templateUrl: './example-two.component.html',
  styleUrl: './example-two.component.scss',
})
export class ExampleTwoComponent {
  // 1. We need a reference to our custom toolbar in the template
  @ViewChild('toolbar') toolbar!: ElementRef;

  // 2. State for our custom buttons (Signals are perfect here)
  isBold = signal(false);
  isItalic = signal(false);

  // 3. Store the Quill instance so we can call .format() manually
  private quillInstance: any;

  // 4. Configuration: We will bind the toolbar container in ngAfterViewInit or let ngx-quill handle it
  // But wait! ngx-quill supports passing the ElementRef directly if we set it up right.
  // For this exercise, we will use the "Selectors" approach or pass the element.
  modules = {
    toolbar: {
      // We will update this in onEditorCreated or bind it if possible.
      // Challenge: How to bind a ViewChild that doesn't exist yet?
      // Hint: Use a simple container ID or let ngx-quill's customToolbarPosition handle it?
      // Better: We will let Quill control the editor, and we MANUALLY control the toolbar.
      container: '#custom-toolbar-2', // We will give our div this ID
    },
  };

  onEditorCreated(quill: any) {
    this.quillInstance = quill;
    console.log('Quill instance ready', quill);
  }

  onSelectionChanged(event: SelectionChange) {
    console.log('### OnSelectionChanged Event:', event);
    if (!this.quillInstance) return;

    if (event.range) {
      // PRACTICE: Get the formats at the current cursor
      const formats = this.quillInstance.getFormat(event.range);

      // PRACTICE: Update your signals
      this.isBold.set(!!formats['bold']);
      this.isItalic.set(!!formats['italic']);
    }
  }

  // PRACTICE: Implement these methods
  toggleBold() {
    if (this.quillInstance) {
      // Toggle logic...
      const current = this.isBold();
      this.quillInstance.format('bold', !current);
    }
  }

  toggleItalic() {
    // Your turn...
    if (this.quillInstance) {
      const isItalic = this.isItalic();
      this.quillInstance.format('italic', !isItalic);
    }
  }
}
