import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  ViewChild,
  Inject
} from "@angular/core";
import { TextService } from "../text-service/text.service";
import { TextFormat, TextStyles } from "../common/TextFormat";
import { StorageService } from "../services/storageService";
import { SynonymsService } from "../services/synonymsService";
import { DOCUMENT } from "@angular/platform-browser";
@Component({
  selector: "app-file",
  templateUrl: "./file.component.html",
  styleUrls: ["./file.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileComponent implements OnInit {
  text: string;
  synonyms: string[];
  @ViewChild('contentEditable') contentEditable: any;
  selectedWord: string;
  @Output() changeSelectWord = new EventEmitter<TextStyles>();

  private _textFormatter: TextFormat;
  get textFormatter(): TextFormat {
    return this._textFormatter;
  }
  @Input()
  set textFormatter(value: TextFormat) {
    if (value != null) {
      if (value.action == "B")
        this.document.execCommand('bold', false, null);
      else if (value.action == "I")
        this.document.execCommand('italic', false, null);
      else if (value.action == "U")
        this.document.execCommand('underline', false, null);
      else if (value.action == "T")
        this.document.execCommand('indent', false, null)
    }
  }
  constructor(
    private ref: ChangeDetectorRef,
    private textService: TextService,
    private storageService: StorageService,
    private synonymsService: SynonymsService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit() {
    this.text = this.storageService.get("textWithCommand");
    if (this.text == null || this.text == "") {
      this.textService.getMockText().then(text => {
        this.text = text;
        this.saveTextWith();
        this.ref.detectChanges();
      });
    }
    this.document.addEventListener('selectionchange', () => {
      this.synonyms = [];
      this.selectWord();
    });
  }

  selectWord() {
    this.selectedWord = this.document.getSelection().toString();
    var styles: string[] = []
    if (this.hasStyle("bold"))
      styles.push("B");
    if (this.hasStyle("italic"))
      styles.push("I");
    if (this.hasStyle("underline"))
      styles.push("U");
    this.changeSelectWord.emit(new TextStyles(styles));

    this.getSynonyms();
  }
  getSynonyms() {
    this.synonymsService
      .getSynonyms(this.selectedWord)
      .subscribe(synonyms => {
        this.synonyms = synonyms.map(x => x.word);
        this.ref.detectChanges();
      });
  }

  selectSynonym(synonym: string) {
    var sel = this.document.getSelection()
    var range = sel.getRangeAt(0);
    range.deleteContents();
    range.insertNode(this.document.createTextNode(synonym));
    this.selectedWord = synonym;
    this.saveText();
  }
  changeText() {
    this.saveText();
  }
  private hasStyle(style: string) {
    return this.document.queryCommandState(style)
  }
  private saveText() {
    this.saveTextWith();
  }
  private saveTextWith() {
    this.storageService.set("textWithCommand", this.contentEditable.nativeElement.innerHTML);
  }
}
