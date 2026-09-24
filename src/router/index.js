import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import SongDetailPage from '../pages/SongDetailPage.vue'
import MusicVideoPage from '../pages/MusicVideoPage.vue'
import MusicVideoDetailPage from '../pages/MusicVideoDetailPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/song/:id', name: 'song-detail', component: SongDetailPage },
  { path: '/videos', name: 'music-videos', component: MusicVideoPage },
  { path: '/video/:id', name: 'video-detail', component: MusicVideoDetailPage },
  { path: '/profile', name: 'profile', component: ProfilePage },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
