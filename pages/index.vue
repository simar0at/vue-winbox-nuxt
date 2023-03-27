<!-- See https://github.com/wobsoriano/vue-winbox/blob/master/playground/src/App.vue -->
<script setup lang="ts">
import type { ConcreteComponent } from 'vue'

const options = {
  title: 'Set title!',
  class: 'modern',
  x: 'center',
  y: 'center',
  width: '50%',
  height: '50%',
}

const Counter = resolveComponent('Counter')
const RemoteImage = resolveComponent('RemoteImage')

// see https://nuxt.com/docs/guide/directory-structure/components#dynamic-components
type forWinBoxComponents = {
  [key: string]: ConcreteComponent | string
}

const forWinBoxComponents: forWinBoxComponents = {
  Counter,
  RemoteImage
}

const windows = reactive({list: [
  { id: 'counter',
    vicavWinBoxRef: ref(),
    isOpen: false,
    kind: 'Counter',
    options: Object.assign({}, options, {title: 'Count: 0',}),
    src: '',
    alt: ''
  }
]})

const setTitle = (count: number) => {
  const counterWindow = windows.list.find( _ => _.id === 'counter')
  if (counterWindow)
  counterWindow.vicavWinBoxRef.winbox?.setTitle(`Count: ${count}`)
}

const openCounter = () => {
  const counterWindow = windows.list.find( _ => _.id === 'counter')
  if (counterWindow) counterWindow.isOpen = true
}

const windowClosing = (window: typeof windows.list[0]) => {
  if (window.id === 'counter')
    window.isOpen = false
  else
    windows.list = windows.list.filter(_ => _.id !== window.id)
}

// TODO: Check winbox status before resizing
// const handleResize = () => {
//   winboxRef.value?.winbox?.resize("50%", "50%").move("center", "center")
// }

// onMounted(() => {
//   window.addEventListener('resize', handleResize)
// })

// onUnmounted(() => {
//   window.removeEventListener('resize', handleResize)
// })

// const initialize = (event) => {
//   if (winboxRef.value)
//     winboxRef.value.initialize()
//   else isOpen.value = true;
// }

const openUrl = () => {
  const randomId = Math.floor(Math.random() * 20) + 1
  windows.list.push({
    id: `Fox${randomId}`,
    vicavWinBoxRef: ref(),
    isOpen: true,
    kind: 'RemoteImage',
    options: Object.assign({}, options, {title: `Fox #${randomId}`,
    class: 'modern'}),
    src: `https://randomfox.ca/images/${randomId}.jpg`,
    alt: `Fox #${randomId}`
  })
}
</script>

<template>
  <div>
    <div v-for="window in windows.list" :key="window.id">
      <VicavWinBox :ref="(el) => window.vicavWinBoxRef = el" :options="window.options" @focus="window.isOpen = true"
        @close="() => windowClosing(window)" v-if="window.isOpen">
        <!-- See https://vuejs.org/api/built-in-special-elements.html#component -->
        <!-- See https://nuxt.com/docs/guide/directory-structure/components#dynamic-components -->
        <component :is="forWinBoxComponents[window.kind]" @update:count="setTitle" :src="window.src" :alt="window.alt">
        </component>
      </VicavWinBox>
    </div>
    <div class="container-fluid text-center" id="main">
      <div class="row bg-dark">
        <div class="col offset-8 align-self-end">
          <div class="container-fluid">
            <div class="row">
              <button type="button" class="col btn btn-primary mt-2 mb-2"
                v-show="!windows.list.find(_ => _.id === 'counter')?.isOpen" @click="openCounter">
                Open Vue component
              </button>
            </div>
            <div class="row">
              <button type="button" class="col btn btn-primary mt-2 mb-2" @click="openUrl">
                Open Random Picture URL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- See ../app.vue for global styles -->
<style scoped>
#main > .row {
  height: 100vh;
}
</style>
