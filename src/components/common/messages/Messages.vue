<template>
  <transition-group
    tag="div"
    name="messages"
    id="messages"
  >
    <Message
      v-for="(message, idx) in messages"
      :key="`message-${idx}`"
      :message="message"
    />
  </transition-group>
</template>

<script setup lang="ts">
import Message from './Message.vue';

defineProps({
  messages: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="sass">
@import 'src/styles/variables.sass'

#messages
  position: fixed
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

  max-width: 400px
  width: 100%
  z-index: 999

  right: 50%
  transform: translateX(50%)
  top: 25%

  @media screen and (max-width: 400px)
    max-width: 90vw

  .message
    margin-bottom: $spacing-md

.messages-enter, .messages-leave-active, .messages-leave-to
  opacity: 0
  transform: translateY(-50%)
</style>
