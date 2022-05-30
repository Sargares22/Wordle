import { Word } from '../types/word';
import { GameModeComposable } from '../types/gameMode';

export default function useGameMode(): GameModeComposable {
  const letterStatuses: Array<string> = ['wrong', 'wrongPlace', 'correct'];

  const getStatus = (statuses: Array<boolean>) => {
    const idx = statuses.findIndex(Boolean);

    return letterStatuses[idx];
  };

  const getStatusPriority = (status: string): number => letterStatuses
    .findIndex((letterStatus) => (letterStatus === status));

  const getPriorityStatus: GameModeComposable['getPriorityStatus'] = (status1: string, status2: string) => {
    return (getStatusPriority(status1) > getStatusPriority(status2))
      ? status1
      : status2;
  };

  const getCharStatus = (solution: string, char: string, idx: number): string => {
    const isCharExist: boolean = solution.includes(char);
    const isCorrectPlace: boolean = (solution[idx] === char);

    const statuses: Array<boolean> = [
      !isCharExist,
      (isCharExist && !isCorrectPlace),
      (isCharExist && isCorrectPlace),
    ];

    return char ? getStatus(statuses) : '';
  };

  const checkWord: GameModeComposable['checkWord'] = (solution: string, word: Word) => word
    .map(({ char }, idx) => ({ char, status: getCharStatus(solution, char, idx) }));

  return {
    checkWord,
    getCharStatus,
    getPriorityStatus,
  };
}
