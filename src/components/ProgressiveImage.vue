<template>
  <div :class="['relative overflow-hidden', containerClass]" :style="containerStyle">
    <div
      v-if="loading"
      :class="['absolute inset-0 skeleton rounded-inherit', skeletonClass]"
    />

    <img
      :src="src"
      :alt="alt"
      :class="[
        'w-full h-full object-cover transition-opacity duration-500',
        loading ? 'opacity-0' : 'opacity-100',
        imgClass
      ]"
      @load="onLoad"
      @error="onError"
    />

    <div
      v-if="error"
      class="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-dark-100"
    >
      <svg class="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: 'Image' },
  containerClass: { type: String, default: '' },
  containerStyle: { type: Object, default: () => ({}) },
  imgClass: { type: String, default: '' },
  skeletonClass: { type: String, default: '' },
})

const loading = ref(true)
const error = ref(false)

function onLoad() {
  loading.value = false
}

function onError() {
  loading.value = false
  error.value = true
}
</script>
