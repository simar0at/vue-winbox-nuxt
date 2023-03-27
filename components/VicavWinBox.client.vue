<script setup lang="ts">
    import { nanoid } from 'nanoid'
    import type { WinBoxConstructor, Params as WinBoxOptions } from 'winbox';
    const selector = `vuewinbox-${nanoid()}`
    const winbox = ref<WinBox | null>(null)
    const initialized = ref(false)

    defineExpose({
      selector,
      winbox,
      initialized,
      initialize,
    })

    const props = withDefaults(defineProps<{
        openOnMount?: boolean,
        options: WinBoxOptions | null
    }>(), {
      openOnMount: true,
      options: null
    })

    interface resizeArgs {id: string | number | undefined , width: number, height: number }
    interface moveArgs {id: string | number | undefined , x: number, y: number }
    interface idArg {id: string | number | undefined}
    const emit = defineEmits<{
      (e: 'resize', _: resizeArgs): void
      (e: 'close', id: idArg ): void
      (e: 'focus', id: idArg): void
      (e: 'blur', id: idArg): void
      (e: 'move', _: moveArgs): void
    }>()

    async function initialize() {
      if (initialized.value) {
        console.error('Please close the window first before reinitializing.')
        return
      }

      winbox.value = (await useWinBox())({
        onresize: (width: number, height: number) => {
          emit('resize', {
            id: winbox.value?.id,
            width,
            height,
          })
        },
        onclose: () => {
          emit('close', { id: winbox.value?.id })
          initialized.value = false
          winbox.value = null
          return false
        },
        onfocus: () => {
          emit('focus', { id: winbox.value?.id })
        },
        onblur: () => {
          emit('blur', { id: winbox.value?.id })
        },
        onmove: (x: number, y: number) => {
          emit('move', {
            id: winbox.value?.id,
            x,
            y,
          })
        },
        ...props.options,
        id: selector,
      })
      initialized.value = true
    }

    onMounted(() => {
      if (!props.openOnMount)
         winbox.value?.hide()      
    })

    onScopeDispose(() => {
      // This causes errors like https://github.com/wobsoriano/vue-winbox/issues/10
      winbox.value?.close()
    })

    await initialize()
</script>

<template>
    <Teleport :to="`#${selector} .wb-body`">
        <slot>No box content provided!</slot>
    </Teleport>
</template>