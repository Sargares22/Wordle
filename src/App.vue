<!--
  todo:
  - fix 'flip' animations
  - fix 'Messages' composable and components for single message
  - update (or split) 'dictionary.json' for more useful words
-->

<template>
  <main class="game">
    <Header
      :statistic="statistic"
      :config="config"
      :state="state"
      @config="onConfigChange"
      @restart="onRestart"
    />

    <GameField :words="formattedWords"/>

    <Keyboard
      :keyboard="state.keyboard.getKeys()"
      :alphabet="game.alphabet.get()"
      @keyboard="handleEvent"
    />
  </main>

  <Messages :messages="messages"/>
</template>

<script setup lang="ts">
import {
  computed, onBeforeUnmount, onMounted, provide,
} from 'vue';
import GameField from './components/GameField.vue';
import Keyboard from './components/Keyboard.vue';
import Header from './components/header/Header.vue';
import Messages from './components/common/messages/Messages.vue';

import useMessages from './composable/messages';
import useGame from './composable/game';
import useEvents from './composable/events';
import useStatistic from './composable/statistic';
import useConfig from './composable/config';
import useColorTheme from './composable/colorTheme';

import { StatisticComposable } from './types/statistic';
import { Word } from './types/word';
import { Config } from './types/config';
import { GameComposable } from './types/game';

const { messages, onMessage } = useMessages();

const {
  config,
  initConfig,
  setConfig,
} = useConfig();

const colorTheme = useColorTheme(config);

const {
  statistic,
  initStatistic,
  setStatistic,
  setFinishStatus,
  setAttemptsState,
}: StatisticComposable = useStatistic();

const {
  state,
  game,
}: GameComposable = useGame(
  config,
  {
    statistic, setStatistic, setFinishStatus, setAttemptsState,
  } as StatisticComposable,
  onMessage,
);

const { handleEvent } = useEvents({ ...game, status: state.status });

const formattedWords = computed<Array<Word>>(() => state.words.get().map((word) => word.get()));

provide('config', config);
provide('delayOrder', game.delayOrder);

onMounted(() => {
  initConfig();
  colorTheme.init();
  initStatistic();
  game.start();

  window.addEventListener('keyup', (event) => handleEvent(event.code));
});

onBeforeUnmount(() => {
  window.removeEventListener('keyup', (event) => handleEvent(event.code));
});

const onConfigChange = ({ key, value }: { key: keyof Config, value: Config }): void => {
  setConfig<Config>(key, value);

  resetGame(key);
};

const resetGame = (key: string): void => {
  const modes = ['hardMode', 'stairMode'];
  const counts = ['maxWords', 'maxLetters'];

  [...modes, ...counts].includes(key) && onRestart();
};

const onRestart = (): void => game.restart();
</script>

<style lang="sass">
@import 'src/styles/variables.sass'
@import 'src/styles/base.sass'

$columns: v-bind('config.maxLetters')
$rows: v-bind('config.maxWords')

.game
  display: flex
  flex-direction: column
  align-items: center
  justify-content: flex-start

  gap: $spacing-xl

  width: 100vw
  height: 100vh

  padding: $spacing-md
  background-color: $col-bg

  overflow: hidden
  user-select: none

  @media screen and (max-width: 520px)
    justify-content: space-between

.header
  max-width: $container-width
</style>
