<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fullscreen-overlay animate-fade-in"
      @click.self="$emit('close')"
      @keydown.esc="$emit('close')"
    >
      <div class="absolute top-4 right-4 flex items-center gap-2 z-10">
        <button
          @click="zoomIn"
          class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all backdrop-blur-sm"
          title="Zoom In"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
          </svg>
        </button>

        <button
          @click="zoomOut"
          class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all backdrop-blur-sm"
          title="Zoom Out"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
          </svg>
        </button>

        <button
          @click="resetZoom"
          class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all backdrop-blur-sm text-xs font-mono"
          title="Reset Zoom"
        >
          {{ Math.round(scale * 100) }}%
        </button>

        <button
          @click="$emit('close')"
          class="w-10 h-10 rounded-full bg-white/10 hover:bg-red-500/80 text-white flex items-center justify-center transition-all backdrop-blur-sm"
          title="Exit Fullscreen (Esc)"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs font-body">
        Press Esc or click outside to exit
      </div>

      <div
        class="overflow-hidden w-full h-full flex items-center justify-center cursor-zoom-in"
        @wheel.prevent="onWheel"
        @click="cycleZoom"
      >
        <img
          :src="src"
          :alt="alt"
          :style="{ transform: `scale(${scale})`, transition: 'transform 0.2s ease' }"
          class="max-w-full max-h-full object-contain select-none"
          draggable="false"
        />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  src: String,
  alt: { type: String, default: 'Image' },
})

defineEmits(['close'])

const scale = ref(1)
const ZOOM_STEP = 0.25
const MAX_ZOOM = 4
const MIN_ZOOM = 0.5

function zoomIn() {
  scale.value = Math.min(scale.value + ZOOM_STEP, MAX_ZOOM)
}
function zoomOut() {
  scale.value = Math.max(scale.value - ZOOM_STEP, MIN_ZOOM)
}
function resetZoom() {
  scale.value = 1
}
function cycleZoom() {
  scale.value = scale.value >= 2 ? 1 : scale.value + 0.5
}

function onWheel(e) {
  if (e.deltaY < 0) zoomIn()
  else zoomOut()
}

watch(() => props.show, (val) => {
  if (!val) scale.value = 1
})
</script>
