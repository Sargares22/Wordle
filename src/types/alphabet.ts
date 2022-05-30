export interface AlphabetLetter {
  char: string
  code: string
  status?: string
}

export type Alphabet = Array<AlphabetLetter>;

export interface AlphabetComposable {
  get: () => Alphabet
}
