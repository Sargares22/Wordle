import {WordComposable} from "./word";

export interface Validator {
  validateWord: (word: WordComposable) => boolean,
  isCorrectWord: (word: WordComposable) => boolean,
}
