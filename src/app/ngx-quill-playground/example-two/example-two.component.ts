import {
  Component,
  signal,
  ViewChild,
  ElementRef,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  QuillEditorComponent,
  ContentChange,
  SelectionChange,
} from 'ngx-quill';
import { CommonModule } from '@angular/common';
import Quill, { Delta } from 'quill';
import { MentionBlot } from 'src/app/services/quills/mention.blot';

const MOCKED_USERS: { [key: string]: string } = {
  'user-001': 'Alice',
  'user-002': 'Bob',
  'user-003': 'Charlie',
  'user-004': 'Diana',
  'user-005': 'Eve',
  'user-006': 'Frank',
  'user-007': 'Grace',
  'user-008': 'Heidi',
  'user-009': 'Ivan',
  'user-010': 'Judy',
};

@Component({
  selector: 'app-example-two',
  standalone: true,
  imports: [QuillEditorComponent, CommonModule, FormsModule],
  templateUrl: './example-two.component.html',
  styleUrl: './example-two.component.scss',
})
export class ExampleTwoComponent {
  @ViewChild('toolbar') toolbar!: ElementRef;

  @Input() editorContent: Delta = new Delta();
  @Output() editorContentChange = new EventEmitter<Delta>();

  protected mockedUsers = Object.entries(MOCKED_USERS).map(([id, value]) => ({
    id,
    value,
  }));
  protected savedData = signal<string>('');

  protected isFocus = signal(false);
  protected isBold = signal(false);
  protected isItalic = signal(false);
  protected isUnderline = signal(false);
  protected isReadonly = signal(false);
  protected characterCount = signal<number>(0);
  // protected editorContent: string = '';
  protected selectedHeader = signal<number | null>(null);

  protected selectedUser = signal<string>(this.mockedUsers[0].id);

  private quillInstance: Quill | null = null;

  modules = {
    toolbar: false, // We are using a custom toolbar
  };

  onEditorCreated(quill: any) {
    this.quillInstance = quill;
    this.quillInstance?.setContents(this.editorContent);
    Quill.register(MentionBlot as any, true);
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
    this.editorContent = event.content;
    this.editorContentChange.emit(this.editorContent);

    this.characterCount.set(this.getCharacterCount());
  }

  onHeaderSelectChange(event: Event) {
    if (!this.quillInstance) return;
    const selectElement = event.target as HTMLSelectElement;
    const value =
      selectElement.value === 'null' ? null : Number(selectElement.value);
    this.setFormat('header', value);
  }

  onFocus(event: any) {
    this.isFocus.set(true);
  }

  onBlur(event: any) {
    this.isFocus.set(false);
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

  onSave() {
    if (this.quillInstance) {
      const delta = this.quillInstance.getContents();
      this.savedData.set(JSON.stringify(delta));
      localStorage.setItem('quill-data', this.savedData());
    }
  }

  onLoad() {
    if (this.quillInstance) {
      this.savedData.set(localStorage.getItem('quill-data') || '');
      if (!this.savedData()) return;
      const delta = JSON.parse(this.savedData());
      this.quillInstance.setContents(delta);
      this.syncState();
    }
  }

  onMentionedUserSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    this.selectedUser.set(value);
  }

  insertMention() {
    if (!this.quillInstance) return;
    const userId = this.selectedUser();
    const userName = this.getUserById(userId);
    const range = this.quillInstance.getSelection(true);
    // Get current selection/cursor
    if (range) {
      this.quillInstance.insertEmbed(range.index, 'mention', {
        id: userId,
        value: userName,
      });
      this.quillInstance.setSelection(range.index + 1);
      // Move cursor past the mention
    }
  }

  getUserById(id: string): string {
    return MOCKED_USERS[id] || 'Unknown User';
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
