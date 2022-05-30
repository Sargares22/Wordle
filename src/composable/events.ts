import { GameComposable } from '../types/game';
import { GameState } from '../types/gameState';
import { AlphabetLetter } from '../types/alphabet';

export default function useEvents(game: GameComposable['game'] & { status: GameState['status'] }) {
  const handleEvent = (code: string): void => {
    const letter: AlphabetLetter = game.alphabet.get().find((item) => (item.code === code)) as AlphabetLetter;

    if (!game.status.get() && !game.delayOrder.value) {
      letter && onWordCharSet(letter.char);
      ['Enter', 'NumpadEnter'].includes(code) && onEnterWord();
      (code === 'Backspace') && onLastLetterRemove();
    }
  };

  const onWordCharSet = (char: string): void => game.addNextLetter(char.toUpperCase());

  const onEnterWord = (): void => game.enterWord();

  const onLastLetterRemove = (): void => game.removeLastLetter();

  return {
    handleEvent,
  };
}
