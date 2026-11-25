# VedantaTattvam — Classical Vedānta Scholarly Platform

A comprehensive research platform and repository for Advaita, Viśiṣṭādvaita, Dvaita, Śāktaviśiṣṭādvaita, and classical Sanskrit Vedānta granthas with multi-script transliteration and authentic commentary exegesis.

## 🚀 Deploying to Vercel

This repository is pre-configured for zero-config deployment to [Vercel](https://vercel.com).

### Option 1: Deploy with Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option 2: Deploy from GitHub / Git Repository
1. Push this project to your GitHub repository.
2. In the [Vercel Dashboard](https://vercel.com/new), select **Import Repository**.
3. Vercel will automatically detect Vite and use the included `vercel.json` configuration.
4. **Environment Variables**:
   - Add `GEMINI_API_KEY`: Your Google Gemini API Key (from [Google AI Studio](https://aistudio.google.com/apikey)).
5. Click **Deploy**.

---

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Start local full-stack server
npm run dev
```

Visit `http://localhost:3000` in your browser.
