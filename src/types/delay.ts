import {Ref} from "vue";

export interface DelayComposable {
  order: Ref<number>,
  orderWithInterval: () => void,
}
