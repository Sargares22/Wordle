import { computed, watch } from 'vue';

import { Config } from '../types/config';

type HTMLElementWithHRef = HTMLAnchorElement | null;

export default function useColorTheme(config: Config) {
  const darkTheme = computed<boolean>(() => config.darkTheme);
  const contrastTheme = computed<boolean>(() => config.highContrastTheme);

  watch(darkTheme, () => setTheme());
  watch(contrastTheme, () => setContrastTheme());

  const init = (): void => setTheme();

  const setTheme = (): void => {
    const theme: keyof typeof themeStyles = darkTheme.value ? 'dark' : 'light';

    const themeStyles: {
      dark: string,
      light: string
    } = {
      dark: '/themes/dark.css',
      light: '/themes/light.css',
    };
    const headStylesheet: HTMLElementWithHRef = document.getElementById('color-theme') as HTMLElementWithHRef;

    headStylesheet && (headStylesheet.href = themeStyles[theme]);
  };

  const setContrastTheme = (): void => {
    const headStylesheet:HTMLElementWithHRef = document.getElementById('additional-color-theme') as HTMLElementWithHRef;

    if (headStylesheet) {
      headStylesheet.href = contrastTheme.value ? '/themes/contrast.css' : '';
    }
  };

  return {
    init,
  };
}
