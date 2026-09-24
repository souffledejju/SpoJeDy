<template>
  <div :class="['min-h-screen pb-20 md:pb-8', isDark ? 'bg-dark-300' : 'bg-gray-50']">

    <section :class="[
      'relative overflow-hidden px-6 py-16 md:py-24',
      isDark ? 'bg-dark-400' : 'bg-gradient-to-br from-primary/5 to-emerald-50'
    ]">
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />

      <div class="max-w-6xl mx-auto relative">
        <p class="text-primary font-mono text-sm font-bold uppercase tracking-widest mb-3 animate-fade-in">
          Welcome to
        </p>
        <h1 class="font-display font-black text-5xl md:text-7xl mb-4 animate-slide-up" :class="isDark ? 'text-white' : 'text-gray-900'">
          Spo<span class="text-primary">Je</span>Dy
        </h1>
        <p class="font-body text-lg md:text-xl max-w-xl animate-slide-up" :class="isDark ? 'text-gray-300' : 'text-gray-600'"
           style="animation-delay: 0.1s">
          Explore and listen to music anytime. Your personal music streaming experience.
        </p>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-6 py-10">
      <div class="flex items-center justify-between mb-8">
        <h2 class="font-display font-bold text-2xl" :class="isDark ? 'text-white' : 'text-gray-900'">
          All Songs
        </h2>
        <span class="font-mono text-sm" :class="isDark ? 'text-gray-500' : 'text-gray-400'">
          {{ songs.length }} tracks
        </span>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        <SongCard
          v-for="(song, i) in songs"
          :key="song.id"
          :song="song"
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
import SongCard from '../components/SongCard.vue'

const dataStore = useDataStore()
const profileStore = useProfileStore()

const songs = computed(() => dataStore.songs)

const isDark = computed(() => profileStore.isDarkMode)
</script>
