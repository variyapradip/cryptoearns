# 🚀 CryptoEarns — Full Next.js Project

Dark-theme crypto earning platform inspired by JumpTask.

---

## 📁 Project Structure

```
cryptoearns/
├── app/
│   ├── globals.css          ← Global dark theme styles
│   ├── layout.js            ← Root layout + Google Fonts
│   ├── page.js              ← 🏠 Landing page (Hero, Tasks, Markets, Partners)
│   ├── login/
│   │   └── page.js          ← Login form
│   └── register/
│       └── page.js          ← Register form
├── components/
│   ├── Navbar.js            ← Fixed navbar + mobile burger
│   └── Footer.js            ← Footer with links
├── package.json
└── next.config.js
```

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open http://localhost:3000
```

---

## 🔥 Connect Firebase Auth

### Step 1 — Install Firebase
```bash
npm install firebase
```

### Step 2 — Create `firebase/firebase.js`
```js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

### Step 3 — Create `.env.local`
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Step 4 — Replace login form handler in `app/login/page.js`
```js
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/firebase';

const handle = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    await signInWithEmailAndPassword(auth, form.email, form.password);
    router.push('/dashboard');
  } catch (err) {
    alert(err.message);
  }
  setLoading(false);
};
```

### Step 5 — Replace register form handler in `app/register/page.js`
```js
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/firebase';

const handle = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    await createUserWithEmailAndPassword(auth, form.email, form.password);
    router.push('/dashboard');
  } catch (err) {
    alert(err.message);
  }
  setLoading(false);
};
```

---

## 💰 Crypto Price API (Free)

Use **CoinGecko API** — completely free, no key needed:

```js
// In app/page.js, replace COINS array with live data:
useEffect(() => {
  fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&x_cg_demo_api_key=${process.env.NEXT_PUBLIC_COINGECKO_KEY}`)
    .then(r => r.json())
    .then(data => setCoins(data));
}, []);
```

---

## 🚀 Deploy on Vercel

### Option 1 — Vercel CLI
```bash
npm install -g vercel
vercel
# Follow prompts — select Next.js, auto-detects everything
```

### Option 2 — GitHub + Vercel Dashboard
1. Push project to GitHub
2. Go to https://vercel.com/new
3. Import your repo
4. Add environment variables (Firebase keys) in Vercel dashboard
5. Click Deploy ✅

### Add env vars in Vercel:
- Go to Project → Settings → Environment Variables
- Add all `NEXT_PUBLIC_FIREBASE_*` variables from `.env.local`

---

## 🗺️ What to Build Next

| Feature | Tool |
|---|---|
| User dashboard | Firebase Auth + Firestore |
| Task system | Firestore collections |
| Crypto wallet | CoinGecko API + Firestore balance |
| Buy crypto | Binance/Coinbase API |
| Referral system | Firestore + unique codes |
| Admin panel | `app/admin/page.js` with role check |

---

## 🎨 Theme Colors

| Name | Hex |
|---|---|
| Background | `#0d0f1a` |
| Card | `#141728` |
| Border | `#252a45` |
| Purple | `#7c3aed` |
| Blue | `#3b82f6` |
| Green | `#22c55e` |
| Text | `#f0f2ff` |
| Muted | `#8892b0` |
