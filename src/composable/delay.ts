import { ref } from 'vue';

import { Config } from '../types/config';
import { DelayComposable } from '../types/delay';

export default function useDelay(config: Config): DelayComposable {
  const order = ref<number>(0);
  const interval = ref<number>();

  const orderWithInterval: DelayComposable['orderWithInterval'] = () => {
    reset();

    interval.value = setInterval(() => {
      order.value++;

      const needToReset = Boolean(order.value === (config.maxLetters + 1));

      needToReset && reset();
    }, config.delay);
  };

  const reset = () => {
    order.value = 0;

    clearInterval(interval.value);
  };

  return {
    order,
    orderWithInterval,
  };
}
