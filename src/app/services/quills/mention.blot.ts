import Quill from 'quill';

const Embed = Quill.import('blots/embed') as any;

// Define a type for the data our blot will represent
interface MentionData {
  id: string;
  value: string;
}

export class MentionBlot extends Embed {
  static blotName = 'mention';
  static tagName = 'span';
  static className = 'mention';

  // The value parameter is the object we pass to insertEmbed
  static create(value: MentionData) {
    // super.create(value) is important for Embed blots
    const node = super.create(value) as HTMLElement;
    node.setAttribute('data-id', value.id);
    node.setAttribute('data-value', value.value);
    node.textContent = `@${value.value}`;
    // Make the blot non-editable
    node.setAttribute('contenteditable', 'false');
    return node;
  }

  // The node parameter is the blot's DOM element in the editor
  static value(node: HTMLElement): MentionData {
    return {
      id: node.getAttribute('data-id') || '',
      value: node.getAttribute('data-value') || '',
    };
  }
}
