# 🪔 Divine Music & Diwali 3D Experience (Shyama Puja & Ayodhya Aagman)

A cinematic, interactive 3D WebGL devotional experience celebrating Maa Shyama Kali Puja, Diwali, and the sacred divine soundscapes of India. Built with **React 18**, **Three.js**, **Web Audio API Spatial Sound**, and **Vite**.

![Divine Music Experience](https://img.shields.io/badge/Status-Live_Ready-brightgreen.svg)
![React](https://img.shields.io/badge/React-18.3-61dafb.svg?logo=react)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-black.svg?logo=three.js)
![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg?logo=vite)
![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7.svg?logo=netlify)

---

## ✨ Features

- **🕉️ 3D Real-Time WebGL Darshan**: Real-time particle system and volumetric illumination simulating sacred diyas, aura fields, and cosmic energy.
- **🎵 Spatial Audio & Divine Soundscapes**: Interactive Web Audio API soundscapes including sacred temple bells (Ghanta), conch (Shankh), damru vibrations, and Vedic chants.
- **🪔 Interactive Virtual Diya Ritual**: Light personalized ghee lamps with custom prayer intentions and dynamic particle flames.
- **✨ Aarti Ritual Simulation**: Interactive thali rotation with real-time flower showers and camphor flames.
- **📜 Sacred Lore & Temple Archives**: Historical narratives of Kalighat, Dakshineswar, Tarapith, and the Ayodhya Deepotsav.
- **🙏 Community Prayer Wall**: Live devotional blessings, chants, and intention submissions with local persistence.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Bundler & Dev Server**: Vite 6
- **3D Graphics**: Three.js (Custom Shader Materials & Particle Engines)
- **Sound Engine**: Web Audio API (Spatial audio panners, synth bells, and devotional loops)
- **Animations**: GSAP (GreenSock) + CSS Glassmorphism
- **Icons**: Lucide React
- **Celebration Effects**: Canvas Confetti

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/adarshgaurav1951/Divine-Music.git

# Navigate to project directory
cd Divine-Music

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
npm run build
```

The production assets will be generated in the `dist/` directory.

---

## 🌐 Netlify Deployment

This repository includes a pre-configured `netlify.toml` file:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Steps to Deploy on Netlify:
1. Log in to [Netlify](https://app.netlify.com).
2. Click **"Add new site"** > **"Import an existing project"**.
3. Select **GitHub** and authorize access.
4. Pick the **`adarshgaurav1951/Divine-Music`** repository.
5. Netlify will auto-detect the build command (`npm run build`) and publish directory (`dist`).
6. Click **Deploy Divine Music** — your site is instantly live with automated CI/CD on every push!

---

## 📜 License

Created with devotion for Diwali & Shyama Puja. Open source under the MIT License.
