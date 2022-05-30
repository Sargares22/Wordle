<template>
  <div class="game-field">
    <Word
      v-for="(word, idx) in words"
      :key="`${word}-${idx}`"
      :word="word"
      :completed="isCompleted(word)"
    >
    </Word>
  </div>
</template>

<script setup lang="ts">
import Word from './Word.vue';

import { Word as WordType } from '../types/word';

type Props = {
  words: Array<WordType>,
};

defineProps<Props>();

const isCompleted = (word: WordType): boolean => word.every(({ status }) => Boolean(status));
</script>

<style lang="sass">
@import 'src/styles/variables.sass'

.game-field
  max-height: 500px
  display: flex
  flex-direction: column
  gap: $grid-gap-md

</style>
