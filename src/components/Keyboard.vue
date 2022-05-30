<template>
  <div class="keyboard">
    <div
      v-for="row in keyboardRows"
      class="keyboard__row"
    >
      <button
        v-for="letter in row"
        :class="[
          'keyboard__key',
          letter.status,
          {
            'service': serviceButtons.includes(letter.code),
          },
        ]"
        @click="onClick(letter.code)"
      >
        <template v-if="(letter.char !== 'backspace')">
          {{ letter.char }}
        </template>

        <i
          v-else
          class="ri-delete-back-2-line"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';

import { Alphabet } from '../types/alphabet';

type Emits = {
  (e: 'keyboard', code: string): void
}
const emit = defineEmits<Emits>();

const props = defineProps({
  keyboard: {
    type: Object,
    required: true,
  },

  alphabet: {
    type: Array,
    default: () => [],
  },
});

const serviceButtons: Array<string> = ['Enter', 'Backspace'];
const rows: Array<string> = ['йцукенгшщзхъ', 'фывапролджэ', 'ячсмитьбю'];

const { keyboard, alphabet } = toRefs(props);

const keyboardRows = computed(() => {
  const filledRows: Array<Alphabet> = rows.map(getFilledRow);

  filledRows[filledRows.length - 1].push({ char: 'backspace', status: '', code: 'Backspace' });
  filledRows[filledRows.length - 1].unshift({ char: 'ввод', status: '', code: 'Enter' });

  return filledRows;
});

const getFilledRow = (row: string): Alphabet => {
  return row.split('').map((char) => {
    const status = (keyboard.value[char] || '');

    const code = ((alphabet.value as Alphabet).find((letter) => (letter.char === char))?.code || '');

    return { char, status, code };
  });
};

const onClick = (code: string): void => emit('keyboard', code);
</script>

<style lang="sass">
@import 'src/styles/variables.sass'

$keyboard-key-height-sm: calc(#{$line-height} * 2)
$keyboard-key-height-md: calc(#{$line-height} * 2.3)

.keyboard
  display: grid
  gap: $grid-gap-md

  @media screen and (max-width: 520px)
    gap: $grid-gap-sm

  &__row
    display: grid
    grid-auto-flow: column
    grid-auto-columns: 1fr
    gap: $grid-gap-md

    @media screen and (max-width: 520px)
      gap: $grid-gap-sm

    .keyboard__key
      display: flex
      align-items: center
      justify-content: center
      height: $keyboard-key-height-md

      padding: $spacing-sm
      margin: 0
      background-color: $col-base-1
      color: $col-base-4

      border: none
      border-radius: $border-radius-md

      font-size: $font-size-md
      font-weight: $font-weight-bold

      text-transform: uppercase
      cursor: pointer
      transition: color $transition-speed-normal ease, background-color $transition-speed-normal ease

      &:hover
        background-color: $col-base-2

      &.correct, &.wrongPlace, &.wrong
        color: $col-text-inverted

      &.correct
        background-color: $col-correct

      &.wrongPlace
        background-color: $col-warning

      &.wrong
        background-color: $col-base-3

      @media screen and (max-width: 520px)
        font-size: $font-size-md
</style>
