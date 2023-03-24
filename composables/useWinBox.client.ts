// vue-winbox/useWinBox.ts at master · wobsoriano/vue-winbox
// https://github.com/wobsoriano/vue-winbox/blob/master/src/composables/useWinBox.ts
import type WinBox from 'winbox'

export async function useWinBox() {
  const nuxtApp = useNuxtApp()
  // @ts-ignore
  const createWinBox: WinBox.WinBoxConstructor = nuxtApp.ssrContext ? () => {} : (await import('winbox/src/js/winbox.js')).default
  return (options: WinBox.Params) => new createWinBox(options)
}