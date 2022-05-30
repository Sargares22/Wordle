export interface Config {
  hardMode: boolean
  stairMode: boolean
  darkTheme: boolean
  highContrastTheme: boolean
  maxWords: number
  maxLetters: number
  language: string
  delay: number
}

export interface ConfigComposable {
  config: Config,
  initConfig: () => void,
  setConfig: <T>(key: keyof T, value: T) => void,
}
