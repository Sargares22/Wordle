<template>
  <div class="message">
    {{ message.title }}
  </div>
</template>

<script setup lang="ts">
defineProps({
  message: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="sass">
@import 'src/styles/variables.sass'

$message-shadow: 3px 5px 32px $col-base-1

.message
  display: flex
  align-items: center
  text-align: center

  padding: $spacing-lg

  border-radius: $border-radius-md
  border-width: 1px
  border-style: solid

  border-color: $col-base-3
  color: $col-base-4
  background-color: $col-bg
  font-size: $font-size-lg
  font-weight: $font-weight-bold

  box-shadow: $message-shadow
  transition: opacity $transition-speed-fast
</style>
