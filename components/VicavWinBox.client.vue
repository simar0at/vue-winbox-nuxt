<script setup lang="ts">
    import { nanoid } from 'nanoid'
    import type { WinBoxConstructor, Params as WinBoxOptions } from '@/types/winbox';
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

    interface createArgs {id: string | number | undefined, options: WinBoxOptions}
    interface resizeArgs {id: string | number | undefined, width: number, height: number }
    interface moveArgs {id: string | number | undefined, x: number, y: number }
    interface idArg {id: string | number | undefined}
    const emit = defineEmits<{
      (e: 'created', _: createArgs): void
      (e: 'resize', _: resizeArgs): void
      (e: 'close', id: idArg ): void
      (e: 'focus', id: idArg): void
      (e: 'blur', id: idArg): void
      (e: 'minimize', id: idArg): void
      (e: 'maximize', id: idArg): void
      (e: 'fullscreen', id: idArg): void
      (e: 'hide', id: idArg): void
      (e: 'show', id: idArg): void
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
        onmaximize: () => {
          emit('maximize', { id: winbox.value?.id })
        },
        onminimize: () => {
          emit('minimize', { id: winbox.value?.id })
        },
        onfullscreen: () => {
          emit('fullscreen', { id: winbox.value?.id })
        },
        onhide: () => {
          emit('hide', { id: winbox.value?.id })
        },
        onshow: () => {
          emit('show', { id: winbox.value?.id })
        },
        oncreate: (options: WinBoxOptions) => {
          emit('created', { id: winbox.value?.id, options })
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