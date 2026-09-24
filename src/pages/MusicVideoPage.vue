<template>
  <div :class="['min-h-screen pb-20 md:pb-8', isDark ? 'bg-dark-300' : 'bg-gray-50']">

    <section :class="[
      'relative overflow-hidden px-6 py-16',
      isDark ? 'bg-dark-400' : 'bg-gradient-to-br from-purple-50 to-indigo-50'
    ]">
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div class="max-w-6xl mx-auto relative">
        <p class="text-indigo-500 font-mono text-sm font-bold uppercase tracking-widest mb-3 animate-fade-in">
          SpoJeDy Presents
        </p>
        <h1 class="font-display font-black text-5xl md:text-6xl mb-4 animate-slide-up" :class="isDark ? 'text-white' : 'text-gray-900'">
          Music <span class="text-indigo-500">Videos</span>
        </h1>
        <p class="font-body text-lg max-w-xl animate-slide-up" :class="isDark ? 'text-gray-300' : 'text-gray-600'"
           style="animation-delay: 0.1s">
          Watch official music videos from your favorite artists.
        </p>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-6 py-10">
      <div class="flex items-center justify-between mb-8">
        <h2 class="font-display font-bold text-2xl" :class="isDark ? 'text-white' : 'text-gray-900'">
          All Music Videos
        </h2>
        <span class="font-mono text-sm" :class="isDark ? 'text-gray-500' : 'text-gray-400'">
          {{ musicVideos.length }} videos
        </span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        <VideoCard
          v-for="(video, i) in musicVideos"
          :key="video.id"
          :video="video"
          :style="{ animationDelay: `${i * 0.08}s` }"
          class="animate-slide-up"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDataStore } from '../stores/data.js'
import { useProfileStore } from '../stores/profile.js'
import VideoCard from '../components/VideoCard.vue'

const dataStore = useDataStore()
const profileStore = useProfileStore()

const musicVideos = computed(() => dataStore.musicVideos)
const isDark = computed(() => profileStore.isDarkMode)
</script>
