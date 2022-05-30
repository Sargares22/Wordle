import useHardMode from './modes/hardMode';

import { Config } from '../types/config';
import { Message } from '../types/message';
import { DictionaryComposable } from '../types/dictionary';
import { GameState } from '../types/gameState';
import { Validator } from '../types/validator';
import { WordComposable } from '../types/word';

type ValidatorSignature = {
  keyboard: GameState['keyboard'],
  dictionary: DictionaryComposable,
  onMessage: (message: Message) => void,
  config: Config,
};

type WordValidationFunction = (word: WordComposable) => boolean;

export default function useValidator({
  dictionary, onMessage, keyboard, config,
} : ValidatorSignature): Validator {
  const { isWordConsistUsedLetters } = useHardMode(keyboard, onMessage);

  const isEnoughWordLength: WordValidationFunction = (word: WordComposable) => {
    const isEnoughChars = word.get().every(({ char }) => Boolean(char));

    !isEnoughChars && onMessage({ type: 'danger', title: 'Не хватает букв в слове!' });

    return isEnoughChars;
  };

  const isWordExist: WordValidationFunction = (word: WordComposable) => {
    const formattedWord: string = word.get().map((v) => v.char).join('');
    const isExist: boolean = dictionary.hasWord(formattedWord);

    !isExist && onMessage({ type: 'danger', title: 'В словаре игры нет такого слова, попробуйте другое!' });

    return isExist;
  };

  const validateWord: Validator['validateWord'] = (word: WordComposable) => {
    const mainValidators: Array<(word: WordComposable) => boolean> = [isEnoughWordLength, isWordExist];
    const additionalValidators: Array<(word: WordComposable) => boolean> = [
      config.hardMode ? (word) => isWordConsistUsedLetters(word) : () => true,
    ];

    return [...mainValidators, ...additionalValidators].every((validator) => validator(word));
  };

  const isCorrectWord: Validator['isCorrectWord'] = (word: WordComposable) => word.get().every(({ status }) => Boolean(status === 'correct'));

  return {
    validateWord,
    isCorrectWord,
  };
}
