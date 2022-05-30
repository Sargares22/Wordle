import {GameState} from "./gameState";
import {AlphabetComposable} from "./alphabet";
import {DelayComposable} from "./delay";
import {Word} from "./word";
import {GameStatus} from "./finishStatus";

export interface GameComposable {
  state: Omit<GameState, 'storage'>,
  game: {
    start: () => void,
    restart: () => void,
    addNextLetter: (char: string) => void,
    setCurrentWordStatus: () => void,
    setGameStatus: () => void,
    removeLastLetter: () => void,
    getWords: () => any[],
    enterWord: () => void,
    alphabet: AlphabetComposable,
    delayOrder: DelayComposable["order"],
  },
}

export interface SavedState {
  solution: string
  words: Array<Word>,
  status: GameStatus
  attempt: number
}
