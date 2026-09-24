import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
  state: () => ({
    // ===== Audio =====
    songs: [
      {
        id: 1,
        title: 'Beauty And A Beat',
        artist: 'Justin Bieber',
        album: 'Believe',
        year: 2012,
        duration: 244,
        cover: 'https://ik.imagekit.io/waapvnq8j/Beauty%20And%20A%20Beat.png',
        audio: 'https://ik.imagekit.io/waapvnq8j/Justin%20Bieber,%20Nicki%20Minaj%20_%20Beauty%20And%20A%20Beat%20(Lyrics).mp3',
        musicVideoId: 1,
      },
      {
        id: 2,
        title: 'JoyRide',
        artist: 'CORTIS',
        album: 'COLOR OUTSIDE THE LINES',
        year: 2025,
        duration: 200,
        cover: 'https://ik.imagekit.io/waapvnq8j/joyride.png',
        audio: 'https://ik.imagekit.io/waapvnq8j/CORTIS.mp3',
        musicVideoId: 2,
      },
      {
        id: 3,
        title: 'The Man Who Can’t Be Moved',
        artist: 'The Script',
        album: 'The Script',
        year: 2008,
        duration: 203,
        cover: 'https://ik.imagekit.io/waapvnq8j/the%20man.png',
        audio: 'https://ik.imagekit.io/waapvnq8j/The%20Man.mp3',
        musicVideoId: 3,
      },
      {
        id: 4,
        title: 'SHEESH',
        artist: 'Babymonster',
        album: "BABYMONS7ER",
        year: 2024,
        duration: 167,
        cover: 'https://ik.imagekit.io/waapvnq8j/Baemon.png',
        audio: 'https://ik.imagekit.io/waapvnq8j/Baemon.mp3',
        musicVideoId: 4,
      },
    ],

    // ===== Music Video =====
    musicVideos: [
      {
        id: 1,
        title: 'Beauty And A Beat',
        artist: 'Justin Bieber',
        cover: 'https://ik.imagekit.io/waapvnq8j/Beauty%20And%20A%20Beat.png',
        video: 'https://ik.imagekit.io/zdy2mvxoz/Beauty%20And%20A%20Beat.mp4?updatedAt=1780556302051',
        songId: 1,
      },
      {
        id: 2,
        title: 'JoyRide',
        artist: 'CORTIS',
        cover: 'https://ik.imagekit.io/waapvnq8j/joyride.png',
        video: 'https://ik.imagekit.io/bktgpag0rs/CORTIS',
        songId: 2,
      },
      {
        id: 3,
        title: 'The Man Who Can’t Be Moved',
        artist: 'The Script',
        cover: 'https://ik.imagekit.io/waapvnq8j/the%20man.png',
        video: 'https://ik.imagekit.io/bktgpag0rs/The%20Man.mp4',
        songId: 3,
      },
      {
        id: 4,
        title: 'SHEESH',
        artist: 'Babymonster',
        cover: 'https://ik.imagekit.io/waapvnq8j/Baemon.png',
        video: 'https://ik.imagekit.io/zdy2mvxoz/Baemon.mp4?updatedAt=1780556301550',
        songId: 4,
      },
    ],
  }),

  getters: {

    getSongById: (state) => (id) => state.songs.find(s => s.id === parseInt(id)),

    getMusicVideoById: (state) => (id) => state.musicVideos.find(v => v.id === parseInt(id)),

    getNextSong: (state) => (currentId) => {
      const idx = state.songs.findIndex(s => s.id === parseInt(currentId))
      return state.songs[(idx + 1) % state.songs.length]
    },

    getPrevSong: (state) => (currentId) => {
      const idx = state.songs.findIndex(s => s.id === parseInt(currentId))
      return state.songs[(idx - 1 + state.songs.length) % state.songs.length]
    },

    getNextVideo: (state) => (currentId) => {
      const idx = state.musicVideos.findIndex(v => v.id === parseInt(currentId))
      return state.musicVideos[(idx + 1) % state.musicVideos.length]
    },

    getPrevVideo: (state) => (currentId) => {
      const idx = state.musicVideos.findIndex(v => v.id === parseInt(currentId))
      return state.musicVideos[(idx - 1 + state.musicVideos.length) % state.musicVideos.length]
    },
  },
})
