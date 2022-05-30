export interface Storage {
  [key: string]: unknown
}

export interface LocalStorageComposable {
  get: () => Storage,
  getKey: (key: keyof Storage) => unknown,
  set: (key: keyof Storage, value: unknown) => void,
  reset: () => void,
}


