<template>
  <header class="header">
    <div class="header__title">
      <Word
        :word="headerTitle"
        :completed="true"
        :flipped="true"
      />
    </div>

    <div class="header__controls">
      <div class="header__restart">
        <i
          v-if="state.status.get()"
          class="icon ri-restart-line"
          @click="!disabled && onRestart()"
        >
        </i>
      </div>

      <div class="header__help">
        <Tutorial :disabled="!disabled"/>
      </div>

      <div class="header__score">
        <Statistic
          :statistic="statistic"
          :config="config"
          :solution="state.solution.get()"
          :status="state.status.get()"
          :disabled="!disabled"
        />
      </div>

      <div class="header__settings">
        <Settings
          :config="config"
          :disabled="!disabled"
          @config="onConfigChange"
        />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue';

import Tutorial from './Tutorial.vue';
import Statistic from './Statistic.vue';
import Settings from './Settings.vue';
import Word from '../Word.vue';

import {Statistic as StatisticType } from "../../types/statistic";
import {Word as WordType} from "../../types/word";
import {Config} from "../../types/config";
import {GameState} from "../../types/gameState";
import {DelayComposable} from "../../types/delay";

type Emits = {
  (e: 'config', data: { key: keyof Config, value: Config }): void
  (e: 'restart'): void
};

type Props = {
  statistic: StatisticType,
  config: Config,
  state: GameState
};


const emits = defineEmits<Emits>();

defineProps<Props>();

const delayOrder = inject<DelayComposable["order"]>('delayOrder');

const headerTitle: WordType = [
  { char: 'W', status: 'correct' },
  { char: 'O', status: 'correct' },
  { char: 'R', status: 'correct' },
  { char: 'D', status: 'correct' },
  { char: 'L', status: 'correct' },
  { char: 'E', status: 'correct' },
];

const disabled = computed<boolean>(() => Boolean(delayOrder?.value));

const onConfigChange = (data: { key: keyof Config, value: Config }) => emits('config', data);

const onRestart = () => emits('restart');
</script>

<style lang="sass">
@import 'src/styles/variables.sass'

$icon-size: 40px

.header
  color: $col-text-primary

  .header__title
    transform: scale(0.6)

    @media screen and (max-width: 400px)
      transform: scale(0.8)

  .header__controls
    display: flex
    justify-content: center
    align-items: center

    gap: $grid-gap-md
</style>
