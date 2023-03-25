<!-- See https://github.com/wobsoriano/vue-winbox/blob/master/playground/src/App.vue -->
<script setup lang="ts">

const options = {
  title: 'Set title!',
  class: 'modern',
  x: 'center',
  y: 'center',
  width: '50%',
  height: '50%',
}

const windows = reactive({list: [
  { id: 'counter',
    vicavWinBoxRef: ref(),
    isOpen: false,
    kind: 'Counter',
    options: Object.assign({}, options, {title: 'Count: 0',})
  }
]})

const setTitle = (count: number) => {
  windows.list[0].vicavWinBoxRef.winbox?.setTitle(`Count: ${count}`)
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

const openUrl = async () => {
  const randomId = Math.floor(Math.random() * 20) + 1
  const createWinBox = await useWinBox()
  createWinBox({
    title: `Fox #${randomId}`,
    url: `https://randomfox.ca/images/${randomId}.jpg`,
    class: 'modern',
  })
}
</script>

<template>
  <div>  
    <VicavWinBox
    :ref="(el) => windows.list[0].vicavWinBoxRef = el"
    :options="options"
    @focus="windows.list[0].isOpen = true"
    @close="windows.list[0].isOpen = false"
    v-if="windows.list[0].isOpen"
  >
    <Counter @update:count="setTitle" />
  </VicavWinBox>
  <div class="container">
    <div v-show="!windows.list[0].isOpen" class="button" @click="windows.list[0].isOpen = true">
      Open Vue component
    </div>
    <div class="button" style="margin-top: 10px;" @click="openUrl">
      Open Random URL
    </div>
  </div>
  </div>
</template>

<!-- See ../app.vue for global styles -->
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.button {
  padding: 5px 10px;
  margin-bottom: 5px;
  display: inline-block;
  background-color: #ca00b4;
  color: #fff;
  width: auto;
  border-radius: 10px;
  padding: 15px 25px;
  cursor: pointer;
}
</style>
