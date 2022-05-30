import { ref } from 'vue';

import { Letter, Word, WordComposable } from '../types/word';

export default function useWord(lettersCount: number, initialWord = {}): WordComposable {
  const word = ref<Word>([]);
  const letterModel: Letter = { char: '', status: '' };

  const init = (): Word => (word.value = new Array(lettersCount)
    .fill('')
    .map(() => ({ ...letterModel, ...initialWord })));

  const get: WordComposable['get'] = () => (word.value);

  const getLetterStatus: WordComposable['getLetterStatus'] = (idx: number) => word.value[idx].status;
  const setLetterStatus : WordComposable['setLetterStatus'] = (idx: number, status: string) => {
    return word.value[idx].status = status;
  };

  const getLetterChar: WordComposable['getLetterChar'] = (idx: number) => word.value[idx].char;
  const setLetterChar: WordComposable['setLetterChar'] = (idx: number, char: string) => (word.value[idx].char = char);

  const getLetter: WordComposable['getLetter'] = (idx: number) => word.value[idx];
  const setLetter: WordComposable['setLetter'] = (idx: number, letter: Letter) => (word.value[idx] = letter);

  const isValidIndex = (idx: number): boolean => Boolean(get()[idx]);
  const validateAndSetLetter = (idx: number, letter: Letter): void => {
    (isValidIndex(idx) && setLetter(idx, letter));
  };

  const countFilledLetters = (): number => get().filter(({ char }) => Boolean(char)).length;

  const addNextLetterChar: WordComposable['addNextLetterChar'] = (char: string) => {
    validateAndSetLetter(countFilledLetters(), {
      char,
      status: '',
    });
  };
  const removeLastLetterChar: WordComposable['removeLastLetterChar'] = () => {
    validateAndSetLetter((countFilledLetters() - 1), {
      char: '',
      status: '',
    });
  };

  init();

  return {
    get,
    getLetterStatus,
    setLetterStatus,
    getLetterChar,
    setLetterChar,
    getLetter,
    setLetter,
    addNextLetterChar,
    removeLastLetterChar,
  };
}
