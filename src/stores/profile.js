import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useProfileStore = defineStore('profile', () => {
  const saved = JSON.parse(localStorage.getItem('spojedy_profile') || '{}')

  const username = ref(saved.username || 'Guest User')
  const profileImage = ref(saved.profileImage || null)
  const isDarkMode = ref(saved.isDarkMode ?? false)

  applyTheme(isDarkMode.value)

  function persist() {
    localStorage.setItem('spojedy_profile', JSON.stringify({
      username: username.value,
      profileImage: profileImage.value,
      isDarkMode: isDarkMode.value,
    }))
  }

  watch([username, profileImage, isDarkMode], persist, { deep: true })

  function toggleTheme() {
    isDarkMode.value = !isDarkMode.value
    applyTheme(isDarkMode.value)
  }

  function applyTheme(dark) {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  function updateUsername(name) {
    username.value = name.trim() || 'Guest User'
  }

  async function updateProfileImage(file) {
    return new Promise((resolve, reject) => {
      if (!file) return reject('No file')

      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          let { width, height } = img
          const MAX = 800
          if (width > height && width > MAX) {
            height = Math.round((height * MAX) / width)
            width = MAX
          } else if (height > MAX) {
            width = Math.round((width * MAX) / height)
            height = MAX
          }

          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, width, height)
          let quality = 0.9
          let dataUrl = canvas.toDataURL('image/jpeg', quality)
          while (dataUrl.length > 1_000_000 && quality > 0.1) {
            quality -= 0.1
            dataUrl = canvas.toDataURL('image/jpeg', quality)
          }
          canvas.toBlob((blob) => {
            if (profileImage.value && profileImage.value.startsWith('blob:')) {
              URL.revokeObjectURL(profileImage.value)
            }
            const blobUrl = URL.createObjectURL(blob)
            profileImage.value = blobUrl
            localStorage.setItem('spojedy_profile_img', dataUrl)
            resolve(blobUrl)
          }, 'image/jpeg', quality)
        }
        img.src = e.target.result
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }
  
  function restoreProfileImage() {
    const saved64 = localStorage.getItem('spojedy_profile_img')
    if (saved64 && (!profileImage.value || profileImage.value === 'null')) {
      profileImage.value = saved64
    }
  }

  return {
    username,
    profileImage,
    isDarkMode,
    toggleTheme,
    updateUsername,
    updateProfileImage,
    restoreProfileImage,
  }
})
