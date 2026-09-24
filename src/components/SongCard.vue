<template>
  <router-link
    :to="`/song/${song.id}`"
    :class="[
      'group block rounded-2xl overflow-hidden transition-all duration-300',
      'hover:-translate-y-1 hover:shadow-xl',
      isDark
        ? 'bg-dark-100 hover:shadow-primary/10'
        : 'bg-white hover:shadow-gray-200'
    ]"
  >
    <div class="relative aspect-square overflow-hidden">
      <ProgressiveImage
        :src="song.cover"
        :alt="song.title"
        container-class="w-full h-full"
        img-class="group-hover:scale-105 transition-transform duration-500"
      />

      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
        <div class="w-12 h-12 rounded-full bg-primary shadow-lg shadow-primary/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
          <svg class="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
    </div>

    <div class="p-4">
      <h3 :class="['font-display font-semibold text-sm truncate',
        isDark ? 'text-white' : 'text-gray-900'
      ]">
        {{ song.title }}
      </h3>
      <p :class="['text-xs mt-0.5 truncate font-body',
        isDark ? 'text-gray-400' : 'text-gray-500'
      ]">
        {{ song.artist }}
      </p>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import { useProfileStore } from '../stores/profile.js'
import ProgressiveImage from './ProgressiveImage.vue'

defineProps({
  song: { type: Object, required: true },
})

const profileStore = useProfileStore()
const isDark = computed(() => profileStore.isDarkMode)
</script>
