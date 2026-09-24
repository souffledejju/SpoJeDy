<template>
  <div :class="['min-h-screen pb-24 md:pb-8', isDark ? 'bg-dark-300' : 'bg-gray-50']" v-if="song">
    <div class="max-w-4xl mx-auto px-6 pt-8">
      <button
        @click="$router.push('/')"
        :class="['flex items-center gap-2 text-sm font-body mb-8 transition-colors',
          isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
        ]"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
        Back to Songs
      </button>
    </div>

    <div class="max-w-4xl mx-auto px-6 pb-10">
      <div class="flex flex-col md:flex-row gap-10 items-center md:items-start">
        <div class="flex-shrink-0">
          <div class="relative">
            <div :class="['absolute -right-8 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full',
              'bg-gradient-to-br from-gray-900 via-gray-700 to-gray-900',
              'border-4 border-gray-800 shadow-2xl hidden md:block',
              isPlaying ? 'vinyl-spin' : 'vinyl-spin paused'
            ]">
              <div class="absolute inset-6 rounded-full bg-gray-900 border border-gray-700" />
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-4 h-4 rounded-full bg-primary/50" />
              </div>
            </div>

            <button
              @click="fullscreenOpen = true"
              class="relative z-10 block w-64 h-64 md:w-72 md:h-72 rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
              title="View fullscreen"
            >
              <ProgressiveImage
                :src="song.cover"
                :alt="song.title"
                container-class="w-full h-full"
                img-class="group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-end justify-center pb-4">
                <span class="text-white text-xs font-body opacity-0 group-hover:opacity-100 transition-all bg-black/50 px-3 py-1 rounded-full">
                  View fullscreen
                </span>
              </div>
            </button>
          </div>
        </div>

        <div class="flex-1 min-w-0 w-full">
          <div class="mb-8 text-center md:text-left">
            <p class="text-primary font-mono text-xs uppercase tracking-widest mb-2">Now Playing</p>
            <h1 :class="['font-display font-black text-3xl md:text-4xl mb-2',
              isDark ? 'text-white' : 'text-gray-900'
            ]">
              {{ song.title }}
            </h1>
            <p :class="['font-body text-lg', isDark ? 'text-gray-300' : 'text-gray-600']">
              {{ song.artist }}
            </p>
            <p :class="['font-body text-sm mt-1', isDark ? 'text-gray-500' : 'text-gray-400']">
              {{ song.album }} · {{ song.year }}
            </p>
          </div>

          <audio
            ref="audioEl"
            :src="song.audio"
            @timeupdate="onTimeUpdate"
            @loadedmetadata="onLoaded"
            @ended="onEnded"
            preload="metadata"
          />

          <div class="mb-6">
            <input
              type="range"
              min="0"
              :max="duration || 100"
              :value="currentTime"
              @input="seek"
              class="w-full"
              :style="progressStyle"
            />
            <div :class="['flex justify-between text-xs font-mono mt-1',
              isDark ? 'text-gray-500' : 'text-gray-400'
            ]">
              <span>{{ formatTime(currentTime) }}</span>
              <span>{{ formatTime(duration) }}</span>
            </div>
          </div>

          <div class="flex items-center justify-center md:justify-start gap-6 mb-8">
            <button
              @click="prevSong"
              :class="['p-2 rounded-full transition-all',
                isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
              ]"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
              </svg>
            </button>

            <button
              @click="togglePlay"
              class="w-16 h-16 rounded-full bg-primary shadow-lg shadow-primary/40 text-white flex items-center justify-center hover:bg-primary/90 transition-all active:scale-95 hover:scale-105"
            >
              <svg v-if="!isPlaying" class="w-7 h-7 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <svg v-else class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            </button>

            <button
              @click="nextSong"
              :class="['p-2 rounded-full transition-all',
                isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
              ]"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z"/>
              </svg>
            </button>
          </div>

          <div class="flex items-center gap-3 mb-8">
            <button @click="toggleMute" :class="['transition-colors', isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900']">
              <svg v-if="volume === 0 || muted" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
              </svg>
              <svg v-else-if="volume < 0.5" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
              </svg>
              <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              :value="muted ? 0 : volume"
              @input="setVolume"
              class="flex-1"
              :style="volumeStyle"
            />
          </div>

          <router-link
            :to="`/video/${song.musicVideoId}`"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-primary text-primary font-body font-medium text-sm hover:bg-primary hover:text-white transition-all duration-200 hover:shadow-lg hover:shadow-primary/30"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
            Watch Music Video
          </router-link>
        </div>
      </div>
    </div>

    <FullscreenImage
      :show="fullscreenOpen"
      :src="song.cover"
      :alt="song.title"
      @close="fullscreenOpen = false"
    />
  </div>

  <div v-else class="flex flex-col items-center justify-center min-h-screen gap-4">
    <p :class="isDark ? 'text-gray-300' : 'text-gray-600'">Song not found.</p>
    <router-link to="/" class="text-primary underline">Go back to Home</router-link>
  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDataStore } from '../stores/data.js'
import { useProfileStore } from '../stores/profile.js'
import ProgressiveImage from '../components/ProgressiveImage.vue'
import FullscreenImage from '../components/FullscreenImage.vue'

const route = useRoute()
const router = useRouter()
const dataStore = useDataStore()
const profileStore = useProfileStore()

const isDark = computed(() => profileStore.isDarkMode)

const song = computed(() => dataStore.getSongById(route.params.id))

const audioEl = ref(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(0.8)
const muted = ref(false)

const fullscreenOpen = ref(false)

function onTimeUpdate() {
  currentTime.value = audioEl.value?.currentTime || 0
}

function onLoaded() {
  duration.value = audioEl.value?.duration || 0
}

function onEnded() {
  nextSong()
}

function togglePlay() {
  if (!audioEl.value) return
  if (isPlaying.value) {
    audioEl.value.pause()
  } else {
    audioEl.value.play()
  }
  isPlaying.value = !isPlaying.value
}

function seek(e) {
  if (!audioEl.value) return
  audioEl.value.currentTime = parseFloat(e.target.value)
}

function setVolume(e) {
  volume.value = parseFloat(e.target.value)
  if (audioEl.value) {
    audioEl.value.volume = volume.value
  }
  muted.value = false
}

function toggleMute() {
  muted.value = !muted.value
  if (audioEl.value) {
    audioEl.value.muted = muted.value
  }
}

function nextSong() {
  const next = dataStore.getNextSong(song.value.id)
  if (next) {
    router.push(`/song/${next.id}`)
  }
}

function prevSong() {
  const prev = dataStore.getPrevSong(song.value.id)
  if (prev) {
    router.push(`/song/${prev.id}`)
  }
}

watch(() => route.params.id, () => {
  isPlaying.value = false
  currentTime.value = 0
  duration.value = 0
})

onUnmounted(() => {
  if (audioEl.value) audioEl.value.pause()
})

function formatTime(s) {
  if (!s || isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

const progressStyle = computed(() => {
  const pct = duration.value ? (currentTime.value / duration.value) * 100 : 0
  return {
    background: `linear-gradient(to right, #1DB954 ${pct}%, ${isDark.value ? '#3a3a3a' : '#e5e7eb'} ${pct}%)`,
  }
})

const volumeStyle = computed(() => {
  const pct = muted.value ? 0 : volume.value * 100
  return {
    background: `linear-gradient(to right, #1DB954 ${pct}%, ${isDark.value ? '#3a3a3a' : '#e5e7eb'} ${pct}%)`,
  }
})
</script>
