import { ref } from 'vue';

import { Alphabet } from '../types/alphabet';

export default function useAlphabet() {
  const alphabet = ref<Alphabet>([
    { char: 'а', code: 'KeyF' },
    { char: 'б', code: 'Comma' },
    { char: 'в', code: 'KeyD' },
    { char: 'г', code: 'KeyU' },
    { char: 'д', code: 'KeyL' },
    { char: 'е', code: 'KeyT' },
    { char: 'ё', code: 'Backquote' },
    { char: 'ж', code: 'Semicolon' },
    { char: 'з', code: 'KeyP' },
    { char: 'и', code: 'KeyB' },
    { char: 'й', code: 'KeyQ' },
    { char: 'к', code: 'KeyR' },
    { char: 'л', code: 'KeyK' },
    { char: 'м', code: 'KeyV' },
    { char: 'н', code: 'KeyY' },
    { char: 'о', code: 'KeyJ' },
    { char: 'п', code: 'KeyG' },
    { char: 'р', code: 'KeyH' },
    { char: 'с', code: 'KeyC' },
    { char: 'т', code: 'KeyN' },
    { char: 'у', code: 'KeyE' },
    { char: 'ф', code: 'KeyA' },
    { char: 'х', code: 'BracketLeft' },
    { char: 'ц', code: 'KeyW' },
    { char: 'ч', code: 'KeyX' },
    { char: 'ш', code: 'KeyI' },
    { char: 'щ', code: 'KeyO' },
    { char: 'ъ', code: 'BracketRight' },
    { char: 'ы', code: 'KeyS' },
    { char: 'ь', code: 'KeyM' },
    { char: 'э', code: 'Quote' },
    { char: 'ю', code: 'Period' },
    { char: 'я', code: 'KeyZ' },
  ]);

  const get = (): Alphabet => alphabet.value;

  return {
    get,
  };
}
