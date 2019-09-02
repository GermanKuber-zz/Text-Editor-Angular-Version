export class TextFormat {
  constructor(public action: string) { }
}

export class TextStyles {
  constructor(public styles: string[]) { }
}
export interface SynonymsResponse {
  word: string;
  score: number;
  tags: string[];
}
