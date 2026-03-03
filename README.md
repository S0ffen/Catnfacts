# Catnfacts 🐱📸

A simple web application built with **Next.js (App Router)** that displays:

* A random cat image
* A random cat fact
* The ability to select a specific breed and fetch a random image for that breed

Live demo: https://catnfacts.vercel.app

---
## What I Learned

Building this project helped me improve my understanding of:

* **Next.js App Router structure** and organizing routes inside the `/app` directory.
* Creating and handling **custom API routes** in Next.js.
* Using the server as a proxy for external APIs to keep requests secure.
* Working with **query parameters** in API endpoints.
* Managing asynchronous data fetching with `fetch`.
* Handling basic error responses (e.g., missing query parameters).
* Structuring a small full-stack project within a single Next.js application.
* Improving UI responsiveness and adding lightweight animations.
* Deploying a Next.js project to Vercel.

## Features

* **Random Cat Generator** – Fetches a random cat image along with a random fact.
* **Breed Selection** – Allows users to select a cat breed and retrieve a random image for that specific breed.
* **Custom API Routes** – Uses Next.js API routes as a backend proxy for external APIs.
* **Responsive UI** – Styled with Tailwind CSS.
* **Basic Animations** – Enhanced user experience with lightweight animation libraries.

---

## Tech Stack

* **Next.js 15 (App Router)**
* **React 19**
* **TypeScript**
* **Tailwind CSS**
* motion (animations)
* react-simple-typewriter
* react-icons

---

## Getting Started

### Prerequisites

* Node.js (LTS recommended)
* npm

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open:
http://localhost:3000

### Other Scripts

```bash
npm run build
npm run start
npm run lint
```

---

## API Routes

The application uses internal Next.js API routes to communicate with external services.

### `GET /api/randomcat`

Returns a random cat image and a random fact.

**Response example:**

```json
{
  "imageUrl": "https://example.com/cat.jpg",
  "fact": "Cats sleep for around 13 to 16 hours a day."
}
```

---

### `GET /api/breeds`

Returns a list of cat breeds fetched from TheCatAPI.

---

### `GET /api/randomCatByBreed?breed=<breedId>`

Returns a random image for a specific breed along with a random fact.

* Returns **400** if the `breed` query parameter is missing.

---

## External APIs Used

* **TheCatAPI** – Cat images and breed data
* **MeowFacts API** – Random cat facts

---

## How It Works

1. On initial load:

   * The app fetches a random cat (`/api/randomcat`)
   * The app fetches the list of breeds (`/api/breeds`)

2. When the user clicks "New Cat":

   * If a breed is selected → `/api/randomCatByBreed`
   * If no breed is selected → `/api/randomcat`

The frontend communicates only with internal API routes, keeping external API calls server-side.

---

## Environment Variables

Currently, the project does not require environment variables.

If using a private API key for TheCatAPI in the future, it should be stored in:

```
.env.local
```

And accessed securely inside API routes.

---

## Deployment

The project can be easily deployed on **Vercel**, which provides native support for Next.js applications.

---

