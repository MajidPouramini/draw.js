import { Editor } from '../Editor';
import { EditorStateRepository } from './EditorStateRepository';

export class EditorUtils {
  editorStateRepository: EditorStateRepository = new EditorStateRepository();
  constructor(private editor: Editor) {}
  public redo() {
    const editorSnapshot: Editor | undefined = this.editorStateRepository.getNextSnapshot();
    if (editorSnapshot) {
      this.applySnapshot(editorSnapshot);
    }
  }
  public undo() {
    const editorSnapshot: Editor | undefined = this.editorStateRepository.getPreviousSnapshot();
    if (editorSnapshot) {
      this.applySnapshot(editorSnapshot);
    }
  }

  private applySnapshot(editorSnapshot: Editor) {
    this.editor.components = editorSnapshot?.components;
  }
}
