import { Component } from "@angular/core";
import { TextFormat, TextStyles } from "./common/TextFormat";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "Simple Text Editor";
  textFormatter: TextFormat;
  selectedWord: TextStyles;
  formatText(textFormatter) {
    this.textFormatter = textFormatter;
  }
  changeSelectWord(word: TextStyles) {
    this.selectedWord = word;
  }
}
