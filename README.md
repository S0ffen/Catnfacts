# Catnfacts 🐱📸

Mała aplikacja webowa w **Next.js (App Router)**, która serwuje:
- losowe zdjęcia kotów,
- losowe ciekawostki o kotach,
- oraz wybór rasy (breed) do losowania zdjęcia dla konkretnej rasy.

Demo: catnfacts.vercel.app :contentReference[oaicite:1]{index=1}

---

## Funkcje

- **Random cat**: zdjęcie + fakt (jednym kliknięciem).
- **Breed selector**: pobranie listy ras i losowanie zdjęcia dla wybranej rasy.
- Proste endpointy API po stronie Next.js (`/api/*`) jako proxy do zewnętrznych API.

Źródła danych:
- obrazy i rasy: TheCatAPI (`/v1/images/search`, `/v1/breeds`) :contentReference[oaicite:2]{index=2}  
- fakty: MeowFacts (`https://meowfacts.herokuapp.com/`) :contentReference[oaicite:3]{index=3}

---

## Stack

- Next.js **15.4.6**
- React **19.1.0**
- TypeScript
- Tailwind CSS
- motion (animacje), react-simple-typewriter, react-icons :contentReference[oaicite:4]{index=4}

---

## Szybki start (lokalnie)

Wymagania: Node.js (najlepiej LTS) + npm.

```bash
npm install
npm run dev
