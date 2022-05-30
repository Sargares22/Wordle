<template>
  <div class="word">
    <div
      v-for="(letter, idx) in word"
      :key="`letter-${idx}`"
      class="letter-container"
    >
      <transition name="flip">
        <Letter
          :letter="letter"
          :key="animatedLetters.includes(idx)"
          :flipped="flippedLetters.includes(idx)"
        />
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref, toRefs, watch, inject, Ref,
} from 'vue';

import Letter from './Letter.vue';

import { Word } from '../types/word';
import { DelayComposable } from '../types/delay';
import { Config } from '../types/config';

const props = defineProps({
  word: {
    type: Array,
    required: true,
  },

  completed: {
    type: Boolean,
    default: false,
  },

  flipped: {
    type: Boolean,
    default: false,
  },
});
const { word, completed, flipped } = toRefs(props);

const delayOrder = inject<DelayComposable['order']>('delayOrder');
const config = inject<Config>('config');

const animatedLetters = ref<Array<number>>([]);
const flippedLetters = ref<Array<number>>([]);

watch(
  completed,
  () => {
    flippedLetters.value = [];
    animatedLetters.value = [];
  },
);
watch([completed, delayOrder], () => animateByDelayOrder());
watch(
  flipped,
  () => {
    flipped?.value && word?.value.forEach((_, idx) => (flippedLetters.value[idx] = idx));
  },
  { immediate: true },
);

const animateByDelayOrder = () => {
  const idx = ((delayOrder?.value || 0) - 1);
  const canAnimate = Boolean((!flipped.value && delayOrder?.value && completed.value) && (word as Ref<Word>).value[idx]?.status);

  canAnimate && animateLetter(idx);
};

const animateLetter = (idx: number) => {
  animatedLetters.value[idx] = idx;

  setTimeout(() => (flippedLetters.value[idx] = idx), ((config?.delay || 0) / 3));
};
</script>

<style lang="sass">
@import 'src/styles/variables.sass'

.word
  display: flex
  gap: $grid-gap-md

  .letter-container
    display: flex
    flex: 1

  .flip-enter-active
    transition: all $transition-speed-slow ease

  .flip-leave-active
    display: none
    transition: all $transition-speed-slow ease

  .flip-enter-to, .flip-leave-to
    transform: rotateX(180deg)
    .letter-char
      transform: rotateX(-180deg)
</style>
