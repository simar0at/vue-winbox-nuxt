<!-- See https://github.com/wobsoriano/vue-winbox/blob/master/playground/src/App.vue -->
<script setup lang="ts">
import type { ConcreteComponent } from 'vue'
import type  VicavWinBox  from '../components/VicavWinBox.client.vue'
import type { Params as WinBoxOptions } from 'winbox';

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

interface VicavWinBoxState {
  id: string,
  vicavWinBoxRef: InstanceType<typeof VicavWinBox> | null,
  isOpen: boolean,
  kind: string,
  options: WinBoxOptions,
  src?: string,
  alt?: string
}

interface VicavWinBoxStates {
  list: VicavWinBoxState[]
}

const winboxes: VicavWinBoxStates = reactive({list: [
  { id: 'counter',
    vicavWinBoxRef: null,
    isOpen: false,
    kind: 'Counter',
    options: Object.assign({}, options, {title: 'Count: 0',})
  }
]})

const setTitle = (count: number) => {
  const counterwinbox = winboxes.list.find( _ => _.id === 'counter')
  if (counterwinbox)
  counterwinbox.vicavWinBoxRef?.winbox?.setTitle(`Count: ${count}`)
}

const openCounter = () => {
  const counterwinbox = winboxes.list.find( _ => _.id === 'counter')
  if (counterwinbox) counterwinbox.isOpen = true
}

const winboxClosing = (winbox: typeof winboxes.list[0]) => {
  if (winbox.id === 'counter')
    winbox.isOpen = false
  else
    winboxes.list = winboxes.list.filter(_ => _.id !== winbox.id)
}

// TODO: Check winbox status before resizing
// const handleResize = () => {
//   winboxRef.value?.winbox?.resize("50%", "50%").move("center", "center")
// }

// onMounted(() => {
//   winbox.addEventListener('resize', handleResize)
// })

// onUnmounted(() => {
//   winbox.removeEventListener('resize', handleResize)
// })

// const initialize = (event) => {
//   if (winboxRef.value)
//     winboxRef.value.initialize()
//   else isOpen.value = true;
// }

const openUrl = () => {
  const randomId = Math.floor(Math.random() * 20) + 1
  winboxes.list.push({
    id: `Fox${randomId}`,
    vicavWinBoxRef: null,
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
    <div v-for="winbox in winboxes.list" :key="winbox.id">
      <VicavWinBox :ref="(i: InstanceType<any>) => winbox.vicavWinBoxRef = i" :options="winbox.options" @focus="winbox.isOpen = true"
        @close="() => winboxClosing(winbox)" v-if="winbox.isOpen">
        <!-- See https://vuejs.org/api/built-in-special-elements.html#component -->
        <!-- See https://nuxt.com/docs/guide/directory-structure/components#dynamic-components -->
        <component :is="forWinBoxComponents[winbox.kind]" @update:count="setTitle" :src="winbox.src" :alt="winbox.alt">
        </component>
      </VicavWinBox>
    </div>
    <div class="container-fluid text-center" id="main">
      <div class="row bg-dark">
        <div class="col offset-8 align-items-start text-white">
          <div class="dropdown mt-3">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              WinBoxes
            </button>
            <ul class="dropdown-menu dropdown-menu-dark">
              <li v-for="winbox in winboxes.list" :key="winbox.id"><a :class="{ 'dropdown-item': true, disabled: !winbox.isOpen }" href="#">{{ winbox.options.title }}</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row bg-dark">
        <div class="col offset-8 align-self-end">
          <div class="container-fluid">
            <div class="row">
              <button type="button" class="col btn btn-primary mt-2 mb-2"
                v-show="!winboxes.list.find(_ => _.id === 'counter')?.isOpen" @click="openCounter">
                Open Vue component
              </button>
            </div>
            <div class="row">
              <button type="button" class="col btn btn-primary mt-2 mb-3" @click="openUrl">
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
  height: 50vh;
}
</style>
