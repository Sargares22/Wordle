<template>
  <Modal ref="modalRef">
    <template #title>
      Настройки
    </template>

    <div class="modal-content">
      <div class="settings__row">
        <div class="settings__description">
          Режим игры "сложный"

          <div class="settings__tip">
            Любые обнаруженные подсказки должны использоваться в следующих словах
          </div>
        </div>

          <Switcher
            :value="config.hardMode"
            @change="onConfigChange({ key: 'hardMode', value: $event })"
          >
          </Switcher>
      </div>

      <hr>

      <div class="settings__row">
        <div class="settings__description">
          Темная тема

          <div class="settings__tip">
            Смена темного и светлого режима
          </div>
        </div>

        <Switcher
          :value="config.darkTheme"
          @change="onConfigChange({ key: 'darkTheme', value: $event })"
        >
        </Switcher>
      </div>

      <hr>

      <div class="settings__row">
        <div class="settings__description">
          Режим высокой контрастности

          <div class="settings__tip">
            Контрастные цвета подсказок (подходит для дальтоников)
          </div>
        </div>

        <Switcher
          :value="config.highContrastTheme"
          @change="onConfigChange({ key: 'highContrastTheme', value: $event })"
        >
        </Switcher>
      </div>
    </div>
  </Modal>

  <i
    class="icon ri-settings-2-line"
    @click="disabled && onModalOpen()"
  >
  </i>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Modal from '../common/Modal.vue';
import Switcher from '../Switcher.vue';

import {Config} from "../../types/config";

type Emits = {
  (e: 'config', data: { key: keyof Config, value: Config }): void
};

const emit = defineEmits<Emits>();

defineProps({
  config: {
    type: Object,
    required: true,
  },

  disabled: {
    type: Boolean,
    default: false,
  }
});

const modalRef = ref<InstanceType<typeof Modal> | null>();

const onConfigChange = ({ key, value }: { key: keyof Config, value: Config }): void => emit('config', { key, value });

const onModalOpen = (): void => modalRef.value.open();
</script>

<style lang="sass">
@import 'src/styles/variables.sass'

.modal
  height: 100%

  .modal-content
    width: 100%

    font-size: inherit

    .settings__row
      display: flex
      flex-direction: row
      justify-content: space-between
      align-items: center

      width: 100%

    .settings__description
      display: flex
      flex-direction: column
      color: $col-text-primary

      font-size: $font-size-xl
      font-weight: $font-weight-bold

    .settings__tip
      font-size: $font-size-lg
      font-weight: 400

      color: $col-text-secondary

      line-height: 1
</style>
