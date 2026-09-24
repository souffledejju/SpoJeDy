<template>
  <div :class="['min-h-screen pb-24 md:pb-8', isDark ? 'bg-dark-300' : 'bg-gray-50']" v-if="video">

    <div class="max-w-5xl mx-auto px-6 pt-8">
      <button
        @click="$router.push('/videos')"
        :class="['flex items-center gap-2 text-sm font-body mb-8 transition-colors',
          isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
        ]"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
        Back to Music Videos
      </button>
    </div>

    <div class="max-w-5xl mx-auto px-6 pb-10">

      <div :class="['rounded-3xl overflow-hidden shadow-2xl mb-8',
        isDark ? 'bg-dark-100' : 'bg-white'
      ]">
        <div class="relative bg-black aspect-video">
          <video
            ref="videoEl"
            :src="video.video"
            class="w-full h-full"
            preload="metadata"
            @timeupdate="onTimeUpdate"
            @loadedmetadata="onLoaded"
            @ended="onEnded"
            @click="togglePlay"
          />

          <transition name="fade">
            <div
              v-if="showPlayOverlay"
              class="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div class="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
                <svg v-if="!isPlaying" class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <svg v-else class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              </div>
            </div>
          </transition>
        </div>

        <div class="px-6 py-4">
          <div class="mb-3">
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

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <button @click="prevVideo" :class="controlBtnClass">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                </svg>
              </button>

              <button
                @click="togglePlay"
                class="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-all active:scale-95 shadow-md shadow-primary/30"
              >
                <svg v-if="!isPlaying" class="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              </button>

              <button @click="nextVideo" :class="controlBtnClass">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18l8.5-6L6 6v12zm2-8.14L11.03 12 8 14.14V9.86zM16 6h2v12h-2z"/>
                </svg>
              </button>
            </div>

            <div class="hidden md:block text-center flex-1 mx-4 overflow-hidden">
              <p :class="['font-display font-semibold text-sm truncate', isDark ? 'text-white' : 'text-gray-900']">
                {{ video.title }}
              </p>
              <p :class="['font-body text-xs', isDark ? 'text-gray-400' : 'text-gray-500']">
                {{ video.artist }}
              </p>
            </div>

            <div class="flex items-center gap-3">
              <button @click="toggleMute" :class="controlBtnClass">
                <svg v-if="volume === 0 || muted" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.5 12A4.5 4.5 0 0014 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                </svg>
                <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
              </button>

              <input
                type="range"
                min="0" max="1" step="0.01"
                :value="muted ? 0 : volume"
                @input="setVolume"
                class="w-20 hidden sm:block"
                :style="volumeStyle"
              />

              <button @click="toggleFullscreen" :class="controlBtnClass" title="Fullscreen">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 :class="['font-display font-black text-2xl md:text-3xl', isDark ? 'text-white' : 'text-gray-900']">
            {{ video.title }}
          </h1>
          <p :class="['font-body', isDark ? 'text-gray-400' : 'text-gray-500']">
            {{ video.artist }}
          </p>
        </div>

        <router-link
          :to="`/song/${video.songId}`"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-body font-medium text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/30 hover:shadow-primary/50 flex-shrink-0"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
          </svg>
          Listen to Song
        </router-link>
      </div>
    </div>
  </div>

  <div v-else class="flex flex-col items-center justify-center min-h-screen gap-4">
    <p :class="isDark ? 'text-gray-300' : 'text-gray-600'">Music video not found.</p>
    <router-link to="/videos" class="text-primary underline">Go back to Music Videos</router-link>
  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDataStore } from '../stores/data.js'
import { useProfileStore } from '../stores/profile.js'

const route = useRoute()
const router = useRouter()
const dataStore = useDataStore()
const profileStore = useProfileStore()

const isDark = computed(() => profileStore.isDarkMode)
const video = computed(() => dataStore.getMusicVideoById(route.params.id))

const videoEl = ref(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(0.8)
const muted = ref(false)
const showPlayOverlay = ref(false)

function onTimeUpdate() {
  currentTime.value = videoEl.value?.currentTime || 0
}
function onLoaded() {
  duration.value = videoEl.value?.duration || 0
  if (videoEl.value) videoEl.value.volume = volume.value
}
function onEnded() {
  nextVideo()
}

function togglePlay() {
  if (!videoEl.value) return
  if (isPlaying.value) {
    videoEl.value.pause()
  } else {
    videoEl.value.play()
  }
  isPlaying.value = !isPlaying.value

  showPlayOverlay.value = true
  setTimeout(() => { showPlayOverlay.value = false }, 600)
}

function seek(e) {
  if (!videoEl.value) return
  videoEl.value.currentTime = parseFloat(e.target.value)
}

function setVolume(e) {
  volume.value = parseFloat(e.target.value)
  if (videoEl.value) videoEl.value.volume = volume.value
  muted.value = false
}

function toggleMute() {
  muted.value = !muted.value
  if (videoEl.value) videoEl.value.muted = muted.value
}

function toggleFullscreen() {
  if (!videoEl.value) return
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    videoEl.value.requestFullscreen()
  }
}

function nextVideo() {
  const next = dataStore.getNextVideo(video.value.id)
  if (next) router.push(`/video/${next.id}`)
}
function prevVideo() {
  const prev = dataStore.getPrevVideo(video.value.id)
  if (prev) router.push(`/video/${prev.id}`)
}

watch(() => route.params.id, () => {
  isPlaying.value = false
  currentTime.value = 0
  duration.value = 0
})

onUnmounted(() => {
  if (videoEl.value) videoEl.value.pause()
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

const controlBtnClass = computed(() => [
  'p-2 rounded-full transition-all',
  isDark.value ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900',
])
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
