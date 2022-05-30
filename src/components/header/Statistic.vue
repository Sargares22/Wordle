<template>
  <Modal ref="modalRef">
    <template #title>
      Статистика
    </template>

    <div class="modal-content">
      <div class="game-state">
        <div class="game-state__item">
          <div class="game-state__number">
            {{ statistic.playedTimes }}
          </div>

          Сыграно
        </div>

        <div class="game-state__item">
          <div class="game-state__number">
            {{ Utils.setToFixed(Utils.getPercents(statistic.victories, statistic.playedTimes), 2) }}%
          </div>

          Процент побед
        </div>

        <div class="game-state__item">
          <div class="game-state__number">
            {{ statistic.streak }}
          </div>

          Побед подряд
        </div>

        <div class="game-state__item">
          <div class="game-state__number">
            {{ statistic.maxStreak }}
          </div>

          Максимум побед подряд
        </div>
      </div>

      <div class="game-attempts">
        <h4>
          Распределение попыток
        </h4>

        <div
          v-for="number in config.maxWords"
          class="game-attempts__row"
        >
          #{{ number }}

          <div class="game-attempts__score">
            <div
              :class="[
                'game-attempts__ratio',
                { 'has-ratio': getAttemptPercentage(number) }
              ]"
              :style="{ 'width': `${Utils.setToFixed(getAttemptPercentage(number),2)}%` }"
            >
              <div class="game-attempts__number">
                {{ Utils.setToFixed(getAttemptPercentage(number), 2) }}%
              </div>
            </div>

          </div>
        </div>
      </div>

      <div
        v-if="(status === 'lose')"
        class="game-solution"
      >
        Правильное слово: <strong>{{ solution }}</strong>
      </div>
    </div>
  </Modal>

  <i
    class="icon ri-bar-chart-2-line"
    @click="disabled && onModalOpen()"
  >
  </i>
</template>

<script setup lang="ts">
import Modal from '../common/Modal.vue';

import { ref, toRefs, watch } from 'vue';

import Utils from '../../services/utils';
import {Statistic} from "../../types/statistic";
import {Config} from "../../types/config";

const modalRef = ref<InstanceType<typeof Modal> | null>();

const props = defineProps({
  statistic: {
    type: Object,
    required: true,
  },

  config: {
    type: Object,
    default: () => {},
  },

  solution: {
    type: String,
    default: '',
  },

  status: {
    type: String,
    default: '',
  },

  disabled: {
    type: Boolean,
    default: false,
  },
});

const { statistic, status, config } = toRefs(props);

watch(status, () => {
    status.value && setTimeout(() => {
      onModalOpen();
    }, (((config.value as Config).delay * (config.value as Config).maxWords) * 1.3));
  }
);

const getAttemptCount = (number: number): number => ((statistic.value as Statistic).attempts[number - 1] || 0);

const getAttemptPercentage = (number: number): number => {
  const attempt: number = getAttemptCount(number);
  const allAttempts: number = Object.values((statistic.value as Statistic).attempts).reduce((acc, value) => (acc + value), 0)

  return ((Utils.toNumber(attempt) / Utils.toNumber(allAttempts)) || 0) * 100;
};

const onModalOpen = (): void => modalRef.value.open();
</script>

<style lang="sass">
@import 'src/styles/variables.sass'

.modal
  height: 100%

  .modal-content
    display: flex
    flex-direction: column
    align-items: center

    .game-state
      display: grid
      grid-auto-columns: 1fr
      grid-auto-flow: column

      &__item
        display: flex
        flex-direction: column
        justify-content: center

        text-align: center
        margin-left: $spacing-sm

        .game-state__number
          font-size: calc(#{$font-size-xl} * 1.8)

    .game-attempts
      width: 100%
      text-align: center

      h4
        margin: $spacing-lg 0

      .game-attempts__row
        display: flex
        place-items: center
        gap: $spacing-md
        margin-bottom: $spacing-sm
        padding: $spacing-sm

        .game-attempts__score
          width: 100%
          background-color: $col-base-1
          border-radius: $spacing-lg

        .game-attempts__ratio
          background-color: $col-correct
          border-radius: $spacing-lg
          color: $col-text-primary

          &.has-ratio
            display: flex
            justify-content: flex-end

            font-weight: $font-weight-bold

            .game-attempts__number
              color: $col-bg
              padding-right: $spacing-md

          .game-attempts__number
            display: flex

            margin: $spacing-sm
            padding-left: $spacing-md
</style>
