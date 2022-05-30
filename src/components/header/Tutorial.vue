<template>
  <Modal ref="modalRef">
    <template #title>
      Как играть в Wordle
    </template>

    <div class="modal-content">
      <p>Вы должны угадать скрытое слово за определенное количество попыток, а цвет букв изменится, чтобы показать, насколько вы близки.</p>
      <p>Чтобы начать игру, просто введите любое слово, например:</p>

      <Word
        :word="examples[0]"
        :completed="true"
        :flipped="true"
      />

      <div class="modal-content__info">
        <div>
          <Letter
            v-for="letter in examples[0].filter(item => item.status === 'wrong')"
            :letter="letter"
            :flipped="true"
          />

          точно нет в слове.
        </div>

        <div>
          <Letter
            v-for="letter in examples[0].filter(item => item.status === 'wrongPlace')"
            :letter="letter"
            :flipped="true"
          />

          есть в слове, но находится не в том месте.
        </div>

        <div>
          <Letter
            v-for="letter in examples[0].filter(item => item.status === 'correct')"
            :letter="letter"
            :flipped="true"
          />

          есть в слове и в точном месте.
        </div>
      </div>

      <p> Еще одна попытка найти совпадающие буквы в целевом слове. </p>

      <Word
        :word="examples[1]"
        :completed="true"
        :flipped="true"
      />

      <p>Уже близко!</p>

      <Word
        :word="examples[2]"
        :completed="true"
        :flipped="true"
      />

      <h5>Слово разгадано!</h5>
    </div>
  </Modal>

  <i
    class="icon ri-question-line"
    @click="disabled && onModalOpen()"
  >
  </i>
</template>

<script setup lang="ts">
import Modal from '../common/Modal.vue';
import Word from '../Word.vue';
import Letter from '../Letter.vue';

import { ref } from 'vue';

import {Word as WordType} from "../../types/word";


type Props = {
  disabled?: boolean
};

defineProps<Props>();

const examples: Array<WordType> = [
  [
    { char: 'Р', status: 'correct' },
    { char: 'А', status: 'wrongPlace' },
    { char: 'Д', status: 'wrong' },
    { char: 'И', status: 'wrong' },
    { char: 'О', status: 'wrong' },
  ],
  [
    { char: 'Р', status: 'correct' },
    { char: 'Е', status: 'correct' },
    { char: 'Ч', status: 'wrong' },
    { char: 'К', status: 'correct' },
    { char: 'А', status: 'correct' },
  ],
  [
    { char: 'Р', status: 'correct' },
    { char: 'Е', status: 'correct' },
    { char: 'П', status: 'correct' },
    { char: 'К', status: 'correct' },
    { char: 'А', status: 'correct' },
  ],
];

const modalRef = ref<InstanceType<typeof Modal> | null>();

const onModalOpen = (): void => modalRef?.value?.open();
</script>

<style lang="sass">
@import 'src/styles/variables.sass'

$max-word-width: 280px

.modal
  h6, h5, p
    margin: $spacing-md

  .letter
    flex: auto
    max-width: 50px

    width: 100%

  .word
    flex: auto

    width: 100%
    max-width: $max-word-width

  &-content
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center

    &__info
      background-color: $col-base-1
      margin-top: $spacing-md

      & > div
        display: flex
        align-items: center

        width: 100%
        padding: $spacing-sm

        color: $col-text-primary

      .letter
        margin-right: $spacing-md

  &-footer
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center

    width: 100%

    &__buttons
      display: flex
      align-items: center
</style>
