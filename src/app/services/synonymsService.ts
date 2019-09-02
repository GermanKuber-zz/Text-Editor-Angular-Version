import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SynonymsResponse } from "../common/TextFormat";
@Injectable()
export class SynonymsService {
  constructor(private http: HttpClient) { }
  getSynonyms(word: string): Observable<SynonymsResponse[]> {
    return this.http.get<SynonymsResponse[]>(
      `https://api.datamuse.com/words?ml=${word}`
    );
  }
}
