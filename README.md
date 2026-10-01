# Birthday Surprise ❤️

## 1. Run it
```bash
npm install
npm run dev      # open the URL it prints
npm run build    # production build
```

## 2. Photos
Put files in `public/images/`: `hero.jpg`, `memory1.jpg` … `memory6.jpg`, `final.jpg`
(or change the paths in the data file). Missing photos show a soft placeholder. Keep each under ~500 KB.

## 3. Music
Put your song at `public/music/our-song.mp3`. It only starts after she taps "Open Your Surprise".
Title/artist: `song` in the data file. A missing file shows a friendly note instead.

## 4–8. Everything personal lives in ONE file: `src/data/birthdayData.js`
| What | Field |
|---|---|
| Her name | `herName` |
| Your name | `myName` |
| Birthday (countdown) | `birthdayDate` (YYYY-MM-DD) |
| Memories / gallery / moments | `memories` |
| Story timeline | `timeline` |
| "Things I love" cards | `reasonsILoveYou` |
| Letter | `letter` (blank line = new paragraph) |
| Poetic section | `poetic` |
| Secret | `secret` |
| Final surprise + photo | `finalMessage`, `finalImage`, `finalCaption` |

Colors: CSS variables at the top of `src/index.css`.
Tab title: `pageTitle` in the data file, plus `<title>` in `index.html`.

## 9. Deploy to Vercel
1. Push this folder to a GitHub repo.
2. On vercel.com: Add New → Project → import the repo.
3. Framework preset Vite (build `npm run build`, output `dist`) → Deploy.
Or CLI: `npx vercel`, then `npx vercel --prod`.
