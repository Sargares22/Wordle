<template>
  <div :class="[
    'letter',
    { 'hasChar': letter.char && !letter.status },
    flipped && letter.status,
   ]">
    <span class="letter-char">
      {{ (letter.char || '') }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { Letter } from '../types/word';

type Props = {
  letter: Letter,
  flipped?: boolean,
};

defineProps<Props>();
</script>

<style lang="sass">
@import 'src/styles/variables.sass'

.letter
  display: flex
  justify-content: center
  align-items: center

  height: 64px
  width: 64px

  color: $col-text-primary
  border: 2px solid $col-base-3
  border-radius: $border-radius-sm

  font-size: calc(#{$font-size-md} * 2.5)
  font-weight: $font-weight-bold

  text-transform: uppercase

  &.hasChar
    border-color: $col-base-3
    animation: scale $transition-speed-slow ease

  &.correct, &.wrongPlace, &.wrong
    border-color: transparent
    color: #fff

  &.correct
    background-color: $col-correct

  &.wrongPlace
    background-color: $col-warning

  &.wrong
    background-color: $col-base-3

  @media screen and (max-width: 400px)
    height: 48px
    width: 48px
    font-size: calc(#{$font-size-md} * 2)

  @keyframes scale
    0%
      transform: scale(1)
    50%
      transform: scale(1.1)
    100%
      transform: scale(1)
</style>
