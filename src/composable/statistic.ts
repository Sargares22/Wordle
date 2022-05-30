import { ref } from 'vue';

import useLocalStorage from './localStorage';

import { Statistic, StatisticComposable } from '../types/statistic';
import { FinishStatus, GameStatus } from '../types/finishStatus';
import { LocalStorageComposable } from '../types/storage';

export default function useStatistic(): StatisticComposable {
  const storage: LocalStorageComposable = useLocalStorage('statistic.value');

  const statistic = ref<Statistic>({
    victories: 0,
    losses: 0,
    streak: 0,
    maxStreak: 0,
    attempts: {},
    lastPlay: 0,
    playedTimes: 0,
  });

  const initStatistic = (): Statistic => (Object.assign(statistic.value, storage.get()));

  const setStatistic = (key: keyof Statistic, data: any): void => {
    statistic.value[key] = data;

    storage.set(String(key), data);
    setLastPlay();
  };

  const setLastPlay = (): void => {
    statistic.value.lastPlay = (new Date()).getTime();

    storage.set('lastPlay', statistic.value.lastPlay);
  };

  const setFinishStatus = (status: GameStatus): void => {
    const key: FinishStatus = (status === 'win') ? 'victories' : 'losses';
    const value: number = (statistic.value[key] + 1);

    setStatistic(key, value);
    setStreakState(status);
    setPlayedTimes();
  };

  const setStreakState = (status: GameStatus): void => {
    const isWin = Boolean((status === 'win'));
    const value: number = isWin ? (statistic.value.streak + 1) : 0;

    setStatistic('streak', value);
    isWin && setMaxStreak();
  };

  const setMaxStreak = (): void => {
    const canIncrease = Boolean(statistic.value.streak > statistic.value.maxStreak);

    canIncrease && setStatistic('maxStreak', statistic.value.streak);
  };

  const setPlayedTimes = (): void => {
    setStatistic('playedTimes', (statistic.value.playedTimes + 1));
  };

  const setAttemptsState = (attempt: number): void => {
    const currentAttemptCount = (statistic.value.attempts[attempt] || 0);

    setStatistic('attempts', { ...statistic.value.attempts, [attempt]: (currentAttemptCount + 1) });
  };

  return {
    statistic,
    initStatistic,
    setStatistic,
    setFinishStatus,
    setAttemptsState,
  };
}
