<template>
  <teleport to="body">
    <div
      v-if="isOpen"
      class="backdrop"
      @click="onClose"
    >
      <section
        class="modal"
        @click.stop
      >
        <div class="modal__header">
          <h2 class="modal__title">
            <slot name="title">
              Заголовок
            </slot>
          </h2>

          <button
            class="modal__close"
            @click="onClose"
          >
            <i class="ri-close-line"></i>
          </button>
        </div>

        <slot></slot>
      </section>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

type Emits = {
  (e: 'confirm', state: boolean): void,
  (e: 'close', state: boolean): void,
};

const emit = defineEmits<Emits>();

let modalController: {
  resolve: ((value: unknown) => void) | null,
  reject: ((value: unknown) => void) | null,
} | null = null;

onMounted(() => document.addEventListener('keydown', handleKeydown));
onBeforeUnmount(() => document.removeEventListener('keydown', handleKeydown));

const isOpen = ref<boolean>(false);

// methods

const handleKeydown = (event: KeyboardEvent): void => {
  (isOpen.value && event.key === 'Escape') && onClose();
};

const open = (): Promise<unknown> => {
  let resolve: ((value: unknown) => void) | null = null;
  let reject: ((value: unknown) => void) | null = null;

  const modalPromise: Promise<unknown> = new Promise((ok, fail) => {
    resolve = ok;
    reject = fail;
  });

  modalController = { resolve, reject };
  isOpen.value = true;

  return modalPromise;
};

const onConfirm = (): void => {
  emit('confirm', true);
  modalController?.resolve?.(true);

  isOpen.value = false;
};

const onClose = (): void => {
  emit('close', false);
  modalController?.resolve?.(false);

  isOpen.value = false;
};

// expose
defineExpose({ open, confirm: onConfirm, close: onClose });
</script>

<style lang="sass">
@import "src/styles/variables.sass"

.backdrop
  position: fixed
  top: 0
  left: 0
  bottom: 0
  right: 0
  z-index: 1000

  display: flex
  flex-direction: column
  align-items: center

  background-color: $col-bg

  .modal
    display: flex
    flex-direction: column
    align-items: center

    max-height: 800px
    max-width: 60%
    width: 100%

    background-color: $col-bg
    color: $col-text-primary

    font-size: $font-size-lg

    @media screen and (max-width: 700px)
      max-width: 90%
      overflow-y: auto

    @media screen and (max-width: 400px)
      max-width: 100%
      padding: $spacing-lg
      font-size: $font-size-md

    &__header
      display: flex
      justify-content: space-between
      align-items: center
      position: relative

      width: 100%
      margin: $spacing-lg 0
      padding: $spacing-md $spacing-lg
      font-size: $font-size-lg
      background-color: $col-base-1
      color: $col-base-4
      border-radius: $border-radius-md

      @media screen and (max-width: 400px)
        font-size: $font-size-md
        margin-top: 0

    &__title
      display: flex
      align-items: center
      justify-content: center

      width: 100%
      margin: 0

    &__close
      font-size: 1.5em
      position: absolute
      right: 1rem

      @media screen and (max-width: 500px)
        position: relative
        padding: 0
</style>
