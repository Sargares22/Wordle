import { computed, watch } from 'vue';
import useDictionary from './dictionary';
import useAlphabet from './alphabet';
import useGameState from './gameState';
import useGameMode from './gameMode';
import useValidator from './validator';
import useGameStatus from './gameStatus';

import useDelay from './delay';

import { Config } from '../types/config';
import { StatisticComposable } from '../types/statistic';
import { Message } from '../types/message';
import { AlphabetComposable } from '../types/alphabet';
import { DictionaryComposable } from '../types/dictionary';
import { GameModeComposable } from '../types/gameMode';
import { DelayComposable } from '../types/delay';
import { Letter, Word, WordComposable } from '../types/word';
import { Validator } from '../types/validator';
import { GameComposable, SavedState } from '../types/game';
import { GameStatus } from '../types/finishStatus';

export default function useGame(
  config: Config,
  statistic: StatisticComposable,
  onMessage: (message: Message) => void,
): GameComposable {
  const {
    words, solution, status, attempt, keyboard, storage,
  } = useGameState(config, statistic as StatisticComposable);
  const { finish }: { finish: (key: string) => void } = useGameStatus(status, onMessage);
  const dictionary: DictionaryComposable = useDictionary(config.maxLetters);
  const gameMode: GameModeComposable = useGameMode();
  const alphabet: AlphabetComposable = useAlphabet();
  const validator: Validator = useValidator({
    dictionary, keyboard, onMessage, config,
  });
  const delay: DelayComposable = useDelay(config);

  const gameStatus = computed<string>(() => status.get());

  watch(gameStatus, () => delay.orderWithInterval());

  const getCurrentWord = (): WordComposable => words.get()[attempt.get()];

  const getWords = () => words.get().map((word) => word.get());

  const start = (): void => {
    keyboard.reset();
    words.reset();
    dictionary.reset();

    const savedState: SavedState = {
      solution: (storage?.getKey('solution') as string || ''),
      words: (storage?.getKey('words') as Array<Word> || []),
      status: (storage?.getKey('status') as GameStatus || ''),
      attempt: (storage?.getKey('attempt') as number || 0),
    };

    const checkedWords: Array<Word> = savedState.words
      .map((word) => gameMode.checkWord(savedState.solution, word));

    words.set(checkedWords);

    setLetters();
    setGameState(savedState);
    initDelay();
  };

  const restart = (): void => {
    storage?.reset();
    start();
  };

  const setLetters = (): void => {
    const checkedLetters: Array<Letter> = getWords()
      .reduce((letters, word) => [...letters, ...word], []);

    checkedLetters.forEach((letter) => {
      const priorityStatus = gameMode
        .getPriorityStatus(letter.status, keyboard.getKey(letter.char.toLowerCase()));

      keyboard.setKey(letter.char.toLowerCase(), priorityStatus);
    });
  };

  const setGameState = (state: SavedState) => {
    const isNewGame: boolean = (state.attempt === 0);

    solution.set(
      isNewGame
        ? dictionary.getRandomWord().toUpperCase()
        : state.solution,
    );
    status.set(state.status);
    attempt.set(state.attempt);
  };

  const initDelay = (): void => {
    const letters: Array<string> = Object.values(keyboard.getKeys()).filter(Boolean);

    letters.length && delay.orderWithInterval();
  };

  const enterWord = (): void => {
    const isValid: boolean = validator.validateWord(getCurrentWord());

    isValid && checkGameStatus();
  };

  const checkGameStatus = (): void => {
    delay.orderWithInterval();
    setCurrentWordStatus();
    setLetters();
    setGameStatus();
  };

  const setCurrentWordStatus = (): void => {
    const checkedWord: Array<{
      char: string, status: string
    }> = gameMode.checkWord(solution.get(), getCurrentWord().get());

    checkedWord.forEach((letter, idx) => getCurrentWord().setLetter(idx, letter));

    words.save();
  };

  const setGameStatus = (): void => {
    validator.isCorrectWord(getCurrentWord())
      ? finish('win')
      : attempt.hasMore()
        ? attempt.set(attempt.get() + 1)
        : finish('lose');
  };

  const addNextLetter = (char: string): void => getCurrentWord().addNextLetterChar(char);

  const removeLastLetter = (): void => getCurrentWord().removeLastLetterChar();

  return {
    state: {
      words,
      solution,
      status,
      attempt,
      keyboard,
    },
    game: {
      start,
      restart,
      addNextLetter,
      setCurrentWordStatus,
      setGameStatus,
      removeLastLetter,
      getWords,
      enterWord,
      alphabet,
      delayOrder: delay.order,
    },
  };
}
