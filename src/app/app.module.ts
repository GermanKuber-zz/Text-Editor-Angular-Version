import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { FileComponent } from "./file/file.component";
import { ControlPanelComponent } from "./control-panel/control-panel.component";
import { HeaderComponent } from "./header/header.component";
import { FormsModule } from "@angular/forms";
import { TextService } from "./text-service/text.service";
import { FooterComponent } from "./footer/footer.component";
import { SynonymsService } from "./services/synonymsService";
import { HttpClientModule } from "@angular/common/http";
import { StorageService } from "./services/storageService";
@NgModule({
  declarations: [
    AppComponent,
    FileComponent,
    ControlPanelComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [TextService, SynonymsService,
    StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
