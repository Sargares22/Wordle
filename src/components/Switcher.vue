<template>
  <div class="switcher">
    <label class="switch">
      <input
        :checked="value"
        type="checkbox"
        @click="toggle"
      >

      <div class="slider round"></div>
    </label>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

type Emits = {
  (e: 'change', value: boolean): void
};

const emits = defineEmits<Emits>();

const props = defineProps({
  value: {
    type: Boolean,
    required: true,
  },
});

const { value } = toRefs(props);

const toggle = (): void => emits('change', !value.value);
</script>

<style lang="sass">
@import 'src/styles/variables.sass'

$switcher-height: 45px
$switcher-width: 25px

$switcher-slider-size: 20px
$switcher-slider-round-size: 34px

.switch
  position: relative

  display: inline-block
  width: $switcher-height
  height: $switcher-width

  input
    display: none

.slider
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0

  background-color: $col-base-1
  transition: background-color $transition-speed-fast, transform $transition-speed-fast,
  cursor: pointer

  &:before
    content: ""
    position: absolute
    height: $switcher-slider-size
    width: $switcher-slider-size
    left: 4px
    bottom: 3px

    background-color: #fff
    transition: background-color $transition-speed-fast, transform $transition-speed-fast,

input
  &:checked + .slider
    background-color: $col-correct

  &:focus + .slider
    box-shadow: 0 0 1px $col-correct

  &:checked + .slider:before
    transform: translateX(17px)

.slider.round
  border-radius: $switcher-slider-round-size

  &:before
    border-radius: 50%
</style>
