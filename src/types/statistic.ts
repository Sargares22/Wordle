import {GameStatus} from "./finishStatus";
import {Ref} from "vue";

export interface Attempts {
  [key: string]: number
}

export interface Statistic {
  victories: number
  losses: number
  streak: number
  maxStreak: number
  attempts: Attempts
  lastPlay: number
  playedTimes: number
}

export interface StatisticComposable {
  statistic: Ref<Statistic>,
  initStatistic: () => Statistic,
  setStatistic: (key: keyof Statistic, data: any ) => void,
  setFinishStatus: (status: GameStatus) => void,
  setAttemptsState: (attempt: number) => void,
}
