<!-- See https://github.com/wobsoriano/vue-winbox/blob/master/playground/src/App.vue -->
<script setup lang="ts">

const options = {
  title: 'Count: 0',
  class: 'modern',
  x: 'center',
  y: 'center',
  width: '50%',
  height: '50%',
}
const winboxRef = ref()
const isOpen = ref(true)

const setTitle = (count: number) => {
  winboxRef.value?.winbox?.setTitle(`Count: ${count}`)
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

const initialize = () => {
  winboxRef.value?.initialize()
}

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
    ref="winboxRef"
    :options="options"
    @focus="isOpen = true"
    @close="isOpen = false"
  >
    <Counter @update:count="setTitle" />
  </VicavWinBox>
  <div class="container">
    <div v-show="!isOpen" class="button" @click="initialize">
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
