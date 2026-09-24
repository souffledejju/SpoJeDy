<template>
  <router-link
    :to="`/video/${video.id}`"
    :class="[
      'group block rounded-2xl overflow-hidden transition-all duration-300',
      'hover:-translate-y-1 hover:shadow-xl',
      isDark
        ? 'bg-dark-100 hover:shadow-primary/10'
        : 'bg-white hover:shadow-gray-200'
    ]"
  >
    <div class="relative aspect-video overflow-hidden bg-black">
      <ProgressiveImage
        :src="video.cover"
        :alt="video.title"
        container-class="w-full h-full"
        img-class="group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
      />

      <div class="absolute inset-0 flex items-center justify-center">
        <div :class="[
          'w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm border-2 border-white/80',
          'flex items-center justify-center',
          'group-hover:bg-primary group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/50',
          'transition-all duration-300 scale-90 group-hover:scale-100'
        ]">
          <svg class="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>

      <div class="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded font-mono">
        MV
      </div>
    </div>

    <div class="p-4">
      <h3 :class="['font-display font-semibold text-sm truncate',
        isDark ? 'text-white' : 'text-gray-900'
      ]">
        {{ video.title }}
      </h3>
      <p :class="['text-xs mt-0.5 truncate font-body',
        isDark ? 'text-gray-400' : 'text-gray-500'
      ]">
        {{ video.artist }}
      </p>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import { useProfileStore } from '../stores/profile.js'
import ProgressiveImage from './ProgressiveImage.vue'

defineProps({
  video: { type: Object, required: true },
})

const profileStore = useProfileStore()
const isDark = computed(() => profileStore.isDarkMode)
</script>
