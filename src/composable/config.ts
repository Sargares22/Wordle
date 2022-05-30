import { reactive } from 'vue';

import useLocalStorage from './localStorage';

import { Config } from '../types/config';
import { LocalStorageComposable } from '../types/storage';

export default function useConfig() {
  const storage: LocalStorageComposable = useLocalStorage('config');

  const config: Config = reactive({
    hardMode: false,
    stairMode: false,
    darkTheme: false,
    highContrastTheme: false,
    maxWords: 6,
    maxLetters: 5,
    language: 'ru',
    delay: 300,
  });

  const initConfig = (): void => {
    Object.assign(config, storage.get());
  };

  const setConfig = <T extends Config>(key: keyof T, value: Config): void => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    config[key] = value;

    storage.set(String(key), value);
  };

  return {
    config,
    initConfig,
    setConfig,
  };
}
