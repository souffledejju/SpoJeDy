<template>
  <div :class="['min-h-screen pb-24 md:pb-8 relative', isDark ? 'bg-dark-300' : 'bg-gray-50']">

    <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 9999;">
      <div id="successToast" class="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            Username successfully updated!
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    </div>
    <section :class="[
      'relative overflow-hidden px-6 py-16',
      isDark ? 'bg-dark-400' : 'bg-gradient-to-br from-rose-50 to-orange-50'
    ]">
      <div class="absolute -top-24 -right-24 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div class="max-w-2xl mx-auto relative">
        <p class="text-rose-500 font-mono text-sm font-bold uppercase tracking-widest mb-3">Your Profile</p>
        <h1 :class="['font-display font-black text-5xl', isDark ? 'text-white' : 'text-gray-900']">
          Settings
        </h1>
      </div>
    </section>

    <div class="max-w-2xl mx-auto px-6 py-10 space-y-6">

      <div :class="cardClass">
        <h2 :class="sectionTitleClass">Profile Image</h2>
        <p :class="sectionSubClass">
        </p>

        <div class="flex flex-col items-center gap-6 mt-6">
          <div class="relative">
            <div v-if="uploadingImage" class="w-32 h-32 rounded-full skeleton" />
            <div v-else class="relative w-32 h-32">
              <img
                v-if="profileStore.profileImage"
                :src="profileStore.profileImage"
                alt="Profile"
                class="w-32 h-32 rounded-full object-cover ring-4 ring-primary/30 shadow-xl"
              />
              <div
                v-else
                class="w-32 h-32 rounded-full bg-primary/20 ring-4 ring-primary/30 flex items-center justify-center shadow-xl"
              >
                <span class="text-primary font-display font-black text-3xl">
                  {{ initials }}
                </span>
              </div>
            </div>
          </div>

          <input
            id="avatarInput"
            type="file"
            accept="image/*"
            class="hidden"
            @change="handleImageUpload"
          />

          <div v-if="imageStatus" :class="[
            'text-sm font-body px-4 py-2 rounded-full',
            imageStatus.type === 'success'
              ? 'bg-primary/10 text-primary'
              : 'bg-red-50 text-red-500 dark:bg-red-500/10'
          ]">
            {{ imageStatus.message }}
          </div>

          <button
            data-bs-toggle="modal" 
            data-bs-target="#uploadModal"
            :class="[
              'cursor-pointer px-6 py-2.5 rounded-full text-sm font-body font-medium transition-all',
              'border-2 border-primary text-primary hover:bg-primary hover:text-white hover:shadow-md hover:shadow-primary/30',
            ]"
          >
            Choose Photo
          </button>
        </div>
      </div>

      <div :class="cardClass">
        <h2 :class="sectionTitleClass">Username</h2>

        <div class="mt-6 flex gap-3">
          <input
            v-model="editUsername"
            type="text"
            placeholder="Enter your username..."
            maxlength="30"
            :class="[
              'flex-1 px-4 py-3 rounded-xl text-sm font-body outline-none transition-all',
              'border-2 focus:border-primary',
              isDark
                ? 'bg-dark-200 border-white/10 text-white placeholder-gray-500 focus:bg-dark-100'
                : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white'
            ]"
            @keyup.enter="saveUsername"
          />
          <button
            @click="saveUsername"
            :disabled="!editUsername.trim() || editUsername === profileStore.username"
            class="px-5 py-3 rounded-xl bg-primary text-white text-sm font-body font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
          >
            Save
          </button>
        </div>
      </div>

      <div :class="cardClass">
        <h2 :class="sectionTitleClass">Theme</h2>

        <div class="mt-6 flex gap-3">
          <button
            @click="setTheme(false)"
            :class="[
              'flex-1 py-4 rounded-xl border-2 font-body font-medium text-sm transition-all flex flex-col items-center gap-2',
              !isDark
                ? 'border-primary bg-primary/5 text-primary shadow-md'
                : isDark ? 'border-white/10 text-gray-400 hover:border-white/20' : 'border-gray-200 text-gray-500 hover:border-gray-300'
            ]"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
            </svg>
            Light Mode
          </button>

          <button
            @click="setTheme(true)"
            :class="[
              'flex-1 py-4 rounded-xl border-2 font-body font-medium text-sm transition-all flex flex-col items-center gap-2',
              isDark
                ? 'border-primary bg-primary/10 text-primary shadow-md'
                : 'border-gray-200 text-gray-500 hover:border-gray-300'
            ]"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
            </svg>
            Dark Mode
          </button>
        </div>
      </div>

      <div :class="[cardClass, 'text-center']">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <img v-if="profileStore.profileImage" :src="profileStore.profileImage" alt="" class="w-12 h-12 rounded-full object-cover" />
            <span v-else class="text-primary font-display font-bold">{{ initials }}</span>
          </div>
          <div class="text-left">
            <p :class="['font-display font-bold', isDark ? 'text-white' : 'text-gray-900']">
              {{ profileStore.username }}
            </p>
            <p :class="['text-sm font-body', isDark ? 'text-gray-400' : 'text-gray-500']">
              {{ isDark ? '🌙 Dark Mode' : '☀️ Light Mode' }} · Profile saved to localStorage
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="uploadModal" tabindex="-1" aria-labelledby="uploadModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" :class="isDark ? 'bg-dark text-white' : ''">
          <div class="modal-header border-0">
            <h5 class="modal-title" id="uploadModalLabel">Upload New Photo</h5>
            <button type="button" class="btn-close" :class="isDark ? 'btn-close-white' : ''" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Are you sure you want to change your profile picture?
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" @click="triggerFileInput" data-bs-dismiss="modal">Yes</button>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProfileStore } from '../stores/profile.js'

const profileStore = useProfileStore()

const editUsername = ref(profileStore.username)
const uploadingImage = ref(false)
const imageStatus = ref(null)

const isDark = computed(() => profileStore.isDarkMode)

const initials = computed(() => {
  return profileStore.username.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
})

const cardClass = computed(() => [
  'rounded-2xl p-6 transition-colors duration-300',
  isDark.value ? 'bg-dark-100 border border-white/5' : 'bg-white shadow-sm border border-gray-100'
])
const sectionTitleClass = computed(() => [
  'font-display font-bold text-lg',
  isDark.value ? 'text-white' : 'text-gray-900'
])
const sectionSubClass = computed(() => [
  'text-sm font-body mt-1',
  isDark.value ? 'text-gray-400' : 'text-gray-500'
])

function showToast() {
  const toastElList = [].slice.call(document.querySelectorAll('.toast'))
  toastElList.map(function(toastEl) {
    return new bootstrap.Toast(toastEl).show()
  })
}

function saveUsername() {
  if (!editUsername.value.trim()) return
  profileStore.updateUsername(editUsername.value)
  showToast()
}

function triggerFileInput() {
  document.getElementById('avatarInput').click()
}

async function handleImageUpload(e) {
  const file = e.target.files?.[0]
  if (!file) return

  uploadingImage.value = true
  imageStatus.value = null

  try {
    await profileStore.updateProfileImage(file)
    imageStatus.value = { type: 'success', message: 'Photo updated' }
  } catch (err) {
    imageStatus.value = { type: 'error', message: 'Upload failed. Please try again.' }
  } finally {
    uploadingImage.value = false
    setTimeout(() => { imageStatus.value = null }, 3000)
  }

  e.target.value = ''
}

function setTheme(dark) {
  if (dark !== profileStore.isDarkMode) {
    profileStore.toggleTheme()
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>