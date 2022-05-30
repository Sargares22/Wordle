import {Word, WordComposable} from "./word";
import {GameStatus} from "./finishStatus";
import {LocalStorageComposable} from "./storage";

interface Words {
  reset: () => void,
  get: () => Array<WordComposable>,
  set: (words: Array<Word>) => void,
  setWord: (unformattedWord: Word, index: number) => void,
  save: () => void,
}

interface Solution {
  get: () => string,
  set: (solution: string) => void,
}

interface Status {
  get: () => string,
  set: (status: GameStatus) => void,
  save: () => void,
}

interface Attempt {
  get: () => number,
  set: (attempt: number) => void,
  hasMore: () => boolean,
}

interface Keyboard {
  reset: () => void,
  getKeys: () => { [key: string]: string },
  getKey: (char: string) => string,
  setKey: (char: string, status: string) => string,
}

export interface GameState {
  words: Words,
  solution: Solution,
  status: Status,
  attempt: Attempt,
  keyboard: Keyboard,
  storage?: LocalStorageComposable,
}
