import { Component, signal, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  imports: [QuillEditorComponent, CommonModule, FormsModule],
  templateUrl: './example-two.component.html',
  styleUrl: './example-two.component.scss',
})
export class ExampleTwoComponent {
  @ViewChild('toolbar') toolbar!: ElementRef;

  protected isBold = signal(false);
  protected isItalic = signal(false);
  protected isUnderline = signal(false);
  protected isReadonly = signal(false);
  protected characterCount = signal<number>(0);
  protected editorContent: string = '';
  protected selectedHeader = signal<number | null>(null);

  private quillInstance: Quill | null = null;

  modules = {
    toolbar: false, // We are using a custom toolbar
  };

  onEditorCreated(quill: any) {
    this.quillInstance = quill;
  }

  onSelectionChanged(event: SelectionChange) {
    if (!this.quillInstance) return;

    // When the editor loses focus, the range is null.
    // We must check for this to prevent the focus-jumping bug.
    if (event.range === null) {
      return;
    }

    // The editor has focus, it's safe to sync the toolbar state.
    this.syncState();
  }
  onEditorChanged(event: ContentChange | SelectionChange) {}

  onContentChanged(event: ContentChange) {
    this.characterCount.set(this.getCharacterCount());
  }

  onHeaderSelectChange(event: Event) {
    if (!this.quillInstance) return;
    const selectElement = event.target as HTMLSelectElement;
    const value =
      selectElement.value === 'null' ? null : Number(selectElement.value);
    this.setFormat('header', value);
  }

  /**
   * Helper to sync our Signals with Quill's internal Truth.
   */
  private syncState() {
    if (!this.quillInstance) return;
    const formats = this.quillInstance.getFormat();
    this.isBold.set(!!formats['bold']);
    this.isItalic.set(!!formats['italic']);
    this.isUnderline.set(!!formats['underline']);
    const header = (formats['header'] as number) ?? null;
    this.selectedHeader.set(header);
  }

  toggleBold() {
    this.setFormat('bold', !this.isBold());
  }

  toggleItalic() {
    this.setFormat('italic', !this.isItalic());
  }

  toggleUnderline() {
    this.setFormat('underline', !this.isUnderline());
  }

  toggleReadOnly() {
    this.isReadonly.set(!this.isReadonly());
  }

  private setFormat(format: string, value: any) {
    if (this.quillInstance) {
      this.quillInstance.format(format, value);
      this.syncState();
    }
  }

  private getCharacterCount(): number {
    if (!this.quillInstance) return 0;
    const text = this.quillInstance.getText();
    return text.trim().length;
  }
}
