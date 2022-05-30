export interface Letter {
  char: string,
  status: string
}

export type Word = Array<Letter>;

export interface WordComposable {
  get: () => Word,
  getLetterStatus: (idx: number) => string,
  setLetterStatus: (idx: number, status: string) => string,
  getLetterChar: (idx: number) => string,
  setLetterChar: (idx: number, char: string) => string,
  getLetter: (idx: number) => Letter,
  setLetter: (idx: number, letter: Letter) => Letter,
  addNextLetterChar: (char: string) => void ,
  removeLastLetterChar: () => void,
}
