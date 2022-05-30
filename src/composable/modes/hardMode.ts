import { WordComposable } from '../../types/word';
import { Message } from '../../types/message';
import { GameState } from '../../types/gameState';
import { HardModeComposable } from '../../types/hardMode';

export default function useHardMode(
  keyboard: GameState['keyboard'],
  onMessage: (message: Message) => void,
): HardModeComposable {
  const isWordConsistUsedLetters = (word: WordComposable): boolean => {
    const keyboardKeys = keyboard.getKeys();
    const usedChars = Object.keys(keyboardKeys)
      .filter((key) => ['correct', 'wrongPlace'].includes(keyboardKeys[key]))
      .map((key) => key.toUpperCase());

    const unusedChars = (): Array<string> => {
      const wordLetters: Array<string> = Object.values(word.get()).map(({ char }) => char);

      return usedChars
        .filter((letter) => !wordLetters.includes(letter));
    };

    const isCorrectWord: boolean = usedChars.length ? !unusedChars().length : true;

    !isCorrectWord && onMessage({ type: 'warning', title: `В слове должны использоваться: ${unusedChars().join(', ')}` });

    return isCorrectWord;
  };

  return {
    isWordConsistUsedLetters,
  };
}
