<template>
  <nav :class="[
    'fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 transition-all duration-300',
    isDark
      ? 'bg-dark-400/90 border-b border-white/10 backdrop-blur-md'
      : 'bg-white/90 border-b border-gray-200 backdrop-blur-md shadow-sm'
  ]">
    <router-link to="/" class="flex items-center gap-2 group">
      <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
          <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"/>
          <path d="M6.5 5.5l4 2.5-4 2.5V5.5z"/>
        </svg>
      </div>
      <span class="font-display font-bold text-lg tracking-tight">
        <span class="text-primary">Spo</span><span :class="isDark ? 'text-white' : 'text-gray-900'">JeDy</span>
      </span>
    </router-link>

    <div class="hidden md:flex items-center gap-1">
      <router-link
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        :class="[
          'px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-200',
          $route.path === link.to || ($route.path.startsWith(link.prefix || '__'))
            ? 'bg-primary text-white shadow-md shadow-primary/30'
            : isDark
              ? 'text-gray-300 hover:text-white hover:bg-white/10'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        ]"
      >
        {{ link.label }}
      </router-link>
    </div>

    <router-link to="/profile" class="flex items-center gap-3 group">
      <span :class="['hidden md:block text-sm font-body font-medium transition-colors',
        isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'
      ]">
        {{ profileStore.username }}
      </span>

      <div class="relative w-9 h-9">
        <img
          v-if="profileStore.profileImage"
          :src="profileStore.profileImage"
          alt="Profile"
          class="w-9 h-9 rounded-full object-cover ring-2 ring-primary/50 group-hover:ring-primary transition-all"
        />

        <div
          v-else
          class="w-9 h-9 rounded-full bg-primary/20 ring-2 ring-primary/50 group-hover:ring-primary flex items-center justify-center transition-all"
        >
          <span class="text-primary font-display font-bold text-sm">
            {{ initials }}
          </span>
        </div>
      </div>
    </router-link>
  </nav>

  <nav :class="[
    'md:hidden fixed bottom-0 left-0 right-0 z-50 h-16 flex items-center justify-around px-4 transition-all duration-300',
    isDark
      ? 'bg-dark-400/95 border-t border-white/10 backdrop-blur-md'
      : 'bg-white/95 border-t border-gray-200 backdrop-blur-md shadow-xl'
  ]">
    <router-link
      v-for="link in navLinks"
      :key="link.to"
      :to="link.to"
      :class="[
        'flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200',
        $route.path === link.to
          ? 'text-primary'
          : isDark ? 'text-gray-400' : 'text-gray-500'
      ]"
    >
      <component :is="link.icon" class="w-5 h-5" />
      <span class="text-xs font-body">{{ link.label }}</span>
    </router-link>
  </nav>
</template>

<script setup>
import { computed, defineComponent, h } from 'vue'
import { useRoute } from 'vue-router'
import { useProfileStore } from '../stores/profile.js'

const profileStore = useProfileStore()
const route = useRoute()

const isDark = computed(() => profileStore.isDarkMode)

const initials = computed(() => {
  const words = profileStore.username.split(' ')
  return words.map(w => w[0]).slice(0, 2).join('').toUpperCase()
})

const HomeIcon = defineComponent({ render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': 2 }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' })]) })
const VideoIcon = defineComponent({ render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': 2 }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M15 10l4.553-2.069A1 1 0 0121 8.845v6.31a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' })]) })
const UserIcon = defineComponent({ render: () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': 2 }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' })]) })

const navLinks = [
  { to: '/', label: 'Home', icon: HomeIcon, prefix: '/song' },
  { to: '/videos', label: 'Music Videos', icon: VideoIcon, prefix: '/video' },
  { to: '/profile', label: 'Profile', icon: UserIcon },
]
</script>
