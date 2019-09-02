import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  Input
} from "@angular/core";
import { TextFormat, TextStyles } from "../common/TextFormat";
@Component({
  selector: "app-control-panel",
  templateUrl: "./control-panel.component.html",
  styleUrls: ["./control-panel.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlPanelComponent {
  @Output() formatText = new EventEmitter<TextFormat>();

  private _selectedWord: TextStyles;
  get selectedWord(): TextStyles {
    return this._selectedWord;
  }
  @Input()
  set selectedWord(value: TextStyles) {
    if (typeof value != "string") this._selectedWord = value;
  }

  hasFormatter(action: string): boolean {
    if (
      this._selectedWord == null ||
      !this._selectedWord.styles.some(x => x == action))
      return false;
    return true;
  }
  bold() {
    this.formatText.emit(new TextFormat("B"));
  }
  italic() {
    this.formatText.emit(new TextFormat("I"));
  }
  underline() {
    this.formatText.emit(new TextFormat("U"));
  }
  tabulation() {
    this.formatText.emit(new TextFormat("T"));
  }
}
