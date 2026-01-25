import {
  Component,
  ElementRef,
  ViewChild,
  signal,
  WritableSignal,
  NgZone,
  ChangeDetectorRef,
} from '@angular/core';
import { JsonPipe, CommonModule } from '@angular/common';
import Quill from 'quill';
import 'quill/dist/quill.core.css';

@Component({
  selector: 'app-quills-playground',
  imports: [JsonPipe, CommonModule],
  templateUrl: './quills-playground.component.html',
  styleUrl: './quills-playground.component.scss',
  standalone: true,
})
export class QuillsPlaygroundComponent {
  @ViewChild('editorContainer') editorContainer!: ElementRef;
  @ViewChild('toolbar') toolbar!: ElementRef;

  public quillTheme: 'snow' | 'bubble' = 'snow';
  public showToolbar = this.quillTheme === 'snow';
  private quill: Quill | null = null;

  // Inspector Data (Signals)
  // Initialize with values that match "Empty Editor" state to prevent ExpressionChanged error
  public editorContent: WritableSignal<string> = signal('<p><br></p>');
  public editorText: WritableSignal<string> = signal('\n');
  public editorDelta: WritableSignal<any> = signal({ ops: [{ insert: '\n' }] });
  public selectionRange: WritableSignal<any> = signal(null);

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
  ) {}

  ngAfterViewInit() {
    // Direct call, no setTimeout needed if initial signal values match UI
    this.initializeQuill();
  }

  initializeQuill() {
    const editorDiv = document.createElement('div');
    this.editorContainer.nativeElement.appendChild(editorDiv);

    // Prepare Modules
    const modules: any = {
      table: true,
    };

    // Configure Toolbar only if visible and ElementRef exists
    if (this.showToolbar && this.toolbar) {
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

    // Initial Data Sync
    this.updateInspector();

    // Event Listeners
    this.quill.on('text-change', () => {
      this.ngZone.run(() => this.updateInspector());
    });

    this.quill.on('selection-change', (range) => {
      this.ngZone.run(() => {
        this.selectionRange.set(range);
      });
    });
  }

  updateInspector() {
    if (!this.quill) return;
    this.editorContent.set(this.quill.root.innerHTML);
    this.editorText.set(this.quill.getText());
    this.editorDelta.set(this.quill.getContents());
  }

  ngDestroy() {
    if (this.quill) {
      this.quill = null;
    }
  }

  public switchQuillTheme() {
    const currentContents = this.quill?.getContents();

    // 1. Destroy Editor DOM
    this.editorContainer.nativeElement.innerHTML = '';

    // 2. Destroy Toolbar DOM (Synchronously)
    this.showToolbar = false;
    this.cdr.detectChanges(); // Angular removes <div #toolbar> from DOM

    // 3. Switch Theme
    this.quillTheme = this.quillTheme === 'snow' ? 'bubble' : 'snow';

    // 4. Recreate Toolbar DOM (Synchronously, if needed)
    if (this.quillTheme === 'snow') {
      this.showToolbar = true;
      this.cdr.detectChanges(); // Angular creates a NEW <div #toolbar>
    }

    // 5. Initialize on fresh DOM
    this.initializeQuill();

    if (currentContents) {
      this.quill?.setContents(currentContents);
      this.updateInspector();
    }
  }
}
