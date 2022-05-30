export type Dictionary = Array<string>;

export interface DictionaryComposable {
  reset: () => void,
  getRandomWord: () => string,
  hasWord: (word: string) => boolean,
}
