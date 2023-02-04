import { Editor } from '../Editor';
import { ShortcutRepository } from './ShortcutRepository';

export class EditorStateRepository {
  constructor() {}
  snapshots: Editor[] = [];
  currentSnapshotIndex: number = 0;

  snapshotsMaxLength: number = 5;

  public addSnapshot(editor: Editor): void {
    const snapshot: Editor = Object.assign({}, editor);
    this.snapshots.push(snapshot);
    if (this.snapshots.length > 5) {
      this.snapshots.shift();
    }
  }

  public getNextSnapshot(): Editor | undefined {
    return this.snapshots.at(--this.currentSnapshotIndex);
  }

  public getPreviousSnapshot(): Editor | undefined {
    return this.snapshots.at(++this.currentSnapshotIndex);
  }

  public clearSnapshots() {
    this.snapshots = [];
  }
}

export function saveSnapshot() {
  return (target: any, key: string, descriptor: any) => {
    let originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      if (args.at(2)?.saveSnapshot) {
        console.log(Editor.getInstance().getCenterPoint());
      }
      return originalMethod.apply(target, args);
    };

    return descriptor;
  };
}
