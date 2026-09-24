# SpoJeDy - Hybrid Music & Music Video Streaming Platform 🎵🎬

SpoJeDy is a modern, responsive web application inspired by Spotify that bridges audio streaming and visual entertainment. Built using Vue 3, Vite, and Tailwind CSS, the platform allows users to seamlessly discover music, create personalized playlists, and switch instantaneously to official music video streaming—combining the best audio experience with YouTube-style video playback in one unified, reactive interface.

---

## 📌 Problem Background

Digital music consumers often find their media consumption fragmented across different platforms:
* **Fragmented Media Experience:** Users frequently have to switch between music apps (like Spotify) for audio listening and video platforms (like YouTube) when they want to watch official music videos or live performances.
* **Disrupted Playback Flow:** Moving across different applications breaks queue management, playlist continuity, and user immersion.
* **Cluttered Interfaces:** Traditional video streaming platforms are often bloated with non-musical content, algorithmic clutter, and irrelevant recommendations when users only want music-related media.

---

## 💡 Proposed Solution

Building an all-in-one **Hybrid Streaming Web App** that merges full-fidelity audio listening, playlist curation, and integrated music video playback into a cohesive, distraction-free player.

---

## ✨ Key Features

* **Dual-Mode Player (Audio & Video Toggle):**
  Seamlessly switch between audio-only streaming and synchronized video playback with a single click without losing track progress.

* **Interactive Music Discovery & Search:**
  Explore trending releases, genres, curated artists, and search for specific tracks or visual performances instantly.

* **Custom Playlist & Library Management:**
  Create, organize, and manage custom playlists that support both audio tracks and music videos within the same collection.

* **Embedded Video Player:**
  Custom-styled, lightweight video player optimized for music videos with playback speed controls, full-screen viewing, and theatre mode.

* **Secure Authentication & User Preferences:**
  Persistent user sessions allowing listeners to save their liked tracks, watch history, and personalized queue states.

---

## 🛠️ Tech Stack & Technical Distribution

Built using modern frontend engineering standards with a modular component architecture:
* **Vite:** Next-generation frontend tooling and development server for lightning-fast HMR and optimized production bundling.
* **Vue.js (Vue 3):** Component-based reactive frontend framework driving the dynamic user interface, reactive state management, and seamless audio/video player switching.
* **Tailwind CSS:** Utility-first CSS framework powering the responsive, Spotify-inspired dark theme and custom micro-interactions.
* **JavaScript (ES6+):** Media player API integrations, event handling, and state synchronization logic.

---

## 👥 Development Team & Contributions

Collaboratively built by:

* **Joseph Aurelio Hendarto**
  * Role: *Frontend Developer & UI/UX Designer*
  * Contributions: Design system architecture, interactive media player interface, dual-mode audio/video toggle components, and responsive Tailwind styling.

* **[maxwellcandra](https://github.com/maxwellcandra)**
  * Role: *Core Developer*
  * Contributions: Media player state engine, queue management logic, playlist storage persistence, and core playback synchronization in Vue.

* **[Cindy Soputri]**
  * Role: *Developer / Search & Discovery*
  * Contributions: Search bar logic, catalog filtering, music metadata structuring, and recommendation views.

* **[Berta Christina]**
  * Role: *Developer / Authentication & QA*
  * Contributions: User authentication flows, account state persistence, edge-case testing, and cross-browser responsiveness validation.

---

## 🚀 Local Setup Instructions

### Prerequisites
Make sure you have **Node.js** (v18 or newer recommended) and **npm** installed on your machine.

1. **Clone this repository:**
   ```bash
   git clone [https://github.com/souffledejju/SpoJeDy.git](https://github.com/souffledejju/SpoJeDy.git)
2. Navigate to the project directory:
   ```bash
   cd SpoJeDy
3. Install dependencies:
```bash
   npm install
4. Start the local development server:
```bash
   npm run dev
5. Open your browser and navigate to the local URL shown in the terminal (usually http://localhost:5173).

Production Build
To create an optimized production build:
```bash
   npm run build
