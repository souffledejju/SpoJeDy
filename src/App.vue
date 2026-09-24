<template>
  <div :class="['min-h-screen transition-colors duration-300',
    profileStore.isDarkMode
      ? 'bg-dark-300 text-white'
      : 'bg-gray-50 text-gray-900'
  ]">
    <NavBar />

    <main class="pt-16">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="$route.path" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import { useProfileStore } from './stores/profile.js'

const profileStore = useProfileStore()

onMounted(() => {
  profileStore.restoreProfileImage()
})
</script>
