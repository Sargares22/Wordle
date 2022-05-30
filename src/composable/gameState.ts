import { ref } from 'vue';
import useAlphabet from './alphabet';
import useWord from './word';
import useLocalStorage from './localStorage';

import { Config } from '../types/config';
import { StatisticComposable } from '../types/statistic';
import { Word, WordComposable } from '../types/word';
import { AlphabetComposable } from '../types/alphabet';
import { GameStatus } from '../types/finishStatus';
import { LocalStorageComposable } from '../types/storage';
import { GameState } from '../types/gameState';

export default function useGameState(config: Config, statistic: StatisticComposable): GameState {
  const storage: LocalStorageComposable = useLocalStorage('gameState');
  const alphabet: AlphabetComposable = useAlphabet();

  const keys: { [key: string]: string } = Object.fromEntries(alphabet.get().map(({ char }) => [char, '']));

  const state = {
    words: ref<Array<WordComposable>>([]),
    solution: ref<string>(''),
    status: ref<string>(''),
    attempt: ref<number>(0),
    keys: ref<{ [key: string]: string }>(keys),
  };

  const words: GameState['words'] = {
    reset: () => (
      state.words.value = new Array(config.maxWords)
        .fill('')
        .map(() => useWord(config.maxLetters))
    ),
    get: () => state.words.value,
    set(words: Array<Word>) {
      words.forEach((word, idx) => this.setWord(word, idx));

      this.save();
    },
    setWord: (unformattedWord: Word, index: number) => {
      unformattedWord
        .forEach((word, idx) => state.words.value[index].setLetter(idx, word));
    },
    save: () => storage.set('words', state.words.value.map((word) => word.get())),
  };

  const solution: GameState['solution'] = {
    get: () => state.solution.value,
    set: (solution: string) => {
      state.solution.value = solution;

      storage.set('solution', solution);
    },
  };

  const status: GameState['status'] = {
    get: () => state.status.value,
    set: (status: GameStatus) => {
      state.status.value = status;
    },
    save: () => {
      (state.status.value === 'win') && statistic.setAttemptsState(state.attempt.value);

      storage.set('status', state.status.value);

      statistic.setFinishStatus(state.status.value as GameStatus);
    },
  };

  const attempt: GameState['attempt'] = {
    get: () => state.attempt.value,
    set: (attempt: number) => {
      state.attempt.value = attempt;

      storage.set('attempt', attempt);
    },
    hasMore: () => !((state.attempt.value + 1) === config.maxWords),
  };

  const keyboard: GameState['keyboard'] = {
    reset: () => Object.keys(state.keys.value).forEach((key) => (state.keys.value[key] = '')),
    getKeys: () => state.keys.value,
    getKey: (char: string) => state.keys.value[char],
    setKey: (char: string, status: string) => (state.keys.value[char] = (status || '')),
  };

  return {
    words,
    solution,
    status,
    attempt,
    keyboard,
    storage,
  };
}
