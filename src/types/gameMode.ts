import {Word} from "./word";

export interface GameModeComposable {
  checkWord: (solution: string, word: Word) => Array<{
    char: string,
    status: string,
  }>,
  getCharStatus: (solution: string, char: string, idx: number) => string,
  getPriorityStatus: (status1: string, status2: string) => string,
}
