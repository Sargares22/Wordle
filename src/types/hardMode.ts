import {WordComposable} from "./word";

export interface HardModeComposable {
  isWordConsistUsedLetters: (word: WordComposable) => boolean
}
