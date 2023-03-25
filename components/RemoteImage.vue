<script lang="ts" setup>
import { stringLiteral } from '@babel/types';

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div data-type="RemoteImage">
    <img :src="src" :alt="alt"/>
  </div>
</template>

<style scoped></style>
