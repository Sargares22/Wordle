import { ref } from 'vue';

import { LocalStorageComposable, Storage } from '../types/storage';

export default function useLocalStorage(name: string): LocalStorageComposable {
  const storage = ref<Storage>({});

  const init = (): void => {
    const store = (localStorage.getItem(name) || '{}');

    storage.value = JSON.parse(store);
  };

  const save = (): void => {
    localStorage.setItem(name, JSON.stringify(storage.value));
  };

  const get = (): Storage => storage.value;

  const getKey = (key: keyof Storage): unknown => (storage.value?.[key] || null);

  const set = (key: keyof Storage, value: unknown): void => {
    storage.value[key] = value;

    save();
  };

  const reset = (): void => {
    Object.keys(storage.value)
      .forEach((key) => set(key, ''));
  };

  init();

  return {
    get,
    getKey,
    set,
    reset,
  };
}
