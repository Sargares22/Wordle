import { ref } from 'vue';

import russianDictionary from '../assets/dictionary.json';

import { Dictionary, DictionaryComposable } from '../types/dictionary';

export default function useDictionary(maxLetters: number): DictionaryComposable {
  const dictionary = ref<Dictionary>([]);

  const init = (): void => {
    dictionary.value = russianDictionary
      .filter((v) => (v.length === maxLetters));
  };

  const reset = (): void => (init());

  const getRandomWord = (): string => dictionary
    .value[Math.floor((Math.random() * dictionary.value.length))];

  const hasWord = (word: string): boolean => (dictionary.value.includes(word.toUpperCase()));

  init();

  return {
    reset,
    getRandomWord,
    hasWord,
  };
}
