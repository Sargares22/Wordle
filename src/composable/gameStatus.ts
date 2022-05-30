import { Message } from '../types/message';
import { GameState } from '../types/gameState';
import { GameStatus } from '../types/finishStatus';

type Status = {
  key: GameStatus,
  theme: string,
  title: string
}

export default function useGameStatus(status: GameState['status'], onMessage: (message: Message) => void): {
  finish: (key: string) => void
} {
  const finish = (key: string): void => {
    const statusesMap: Array<Status> = [
      { key: 'win', theme: 'success', title: 'Вы выиграли!' },
      { key: 'lose', theme: 'danger', title: 'Вы проиграли!' },
    ];
    const newStatus: Status = statusesMap.find((status) => (status.key === key)) || statusesMap[0];

    status.set(newStatus.key);

    onMessage({ type: newStatus.theme, title: newStatus.title });
    status.save();
  };

  return {
    finish,
  };
}
