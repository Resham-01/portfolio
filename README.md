# 🚀 Resham Kumar Thapa - Full-Stack Portfolio

A modern, high-performance, dynamic portfolio built with **React (Vite)**, **Three.js**, **Express.js**, **MongoDB Atlas**, and **Nodemailer**.

Designed for seamless deployment with **GitHub** and **Vercel** with full-stack dynamic serverless API support.

---

## 🌟 Key Features

- ⚡ **Dynamic Direct Messaging & Nodemailer**: Direct messages submitted via the portfolio form are recorded in MongoDB Atlas and immediately emailed to `reshamkumar4533@gmail.com`.
- 🎨 **Modern Aesthetics & Responsive Design**: Smooth gradients, glassmorphism, glowing accents, and dark/bright theme switching.
- 🧊 **3D Interactive Canvas**: Interactive Three.js 3D developer desk with OrbitControls and floating badges.
- 📱 **Full Cross-Device Responsiveness**: Tailored layouts for desktop, tablet, and mobile displays.
- 📄 **Dynamic CV Generation**: Server-side and client-side CV download and preview.
- ☁️ **Vercel Serverless Ready**: Fullstack monorepo structure with `/api/*` serverless backend endpoints.

---

## 🏗️ Project Architecture

```
protfilio/
├── api/                  # Vercel Serverless Function entrypoint (/api/*)
│   └── index.js
├── client/               # React + Vite Frontend
│   ├── src/
│   │   ├── components/   # Hero, About, Skills, Projects, Contact, Footer
│   │   ├── styles/       # SCSS Styling and Design System
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── server/               # Express.js Backend
│   ├── src/
│   │   ├── routes/       # profile.js, contact.js, cv.js
│   │   ├── utils/        # mailer.js, config.js
│   │   ├── app.js        # Shared Express Application
│   │   └── index.js      # Local dev server starter
│   ├── .env              # Environment Variables
│   └── package.json
├── package.json          # Monorepo root scripts
├── vercel.json           # Vercel deployment routing & build config
└── .gitignore            # Git exclusions (credentials, node_modules)
```

---

## 🚀 How to Host on GitHub & Vercel

### Step 1: Push Code to GitHub

1. Open your terminal in the project root (`protfilio`):
```bash
git init
git add .
git commit -m "feat: complete dynamic portfolio with email & Vercel support"
```

2. Create a new repository on **GitHub** (e.g. `portfolio`).

3. Link and push your repository:
```bash
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
git push -u origin main
```

---

### Step 2: Deploy to Vercel (Free & Instant)

1. Go to **[https://vercel.com](https://vercel.com)** and log in with your GitHub account.
2. Click **"Add New..."** ➔ **"Project"**.
3. Import your GitHub repository (`portfolio`).
4. Keep the default settings (Framework Preset: *Vite* or *Other* — `vercel.json` automatically configures the build).
5. Open the **"Environment Variables"** dropdown and add the following 4 variables:

| Key | Value | Description |
|---|---|---|
| `MONGO_URI` | `mongodb+srv://...` | Your MongoDB Atlas connection string |
| `RECEIVER_EMAIL` | `reshamkumar4533@gmail.com` | Where contact messages are delivered |
| `EMAIL_USER` | `reshamkumar4533@gmail.com` | Your Gmail address used to send emails |
| `EMAIL_PASS` | `your_16_char_app_password` | Your 16-character Google App Password |

6. Click **Deploy**.
7. Vercel will build and deploy your site in ~1 minute with a live `.vercel.app` URL and continuous auto-deployments whenever you push to GitHub!

---

## 💻 Local Development

### Run Client & Server Concurrently:
```bash
# In the root folder:
npm run dev:all
```

Or run them individually:
```bash
# In client:
cd client
npm run dev

# In server:
cd server
npm run dev
```

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`
