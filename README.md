# Dota 2 Hero Stats Dashboard

A web-based dashboard that visualizes Dota 2 hero statistics using data from the [OpenDota API](https://docs.opendota.com/).  
This project was created as part of a take-home technical assessment.

## ✨ Features

- 📊 Meta suggestion of 10 best heroes for each of the 8 matchmaking tiers
- 🧠 Pro meta suggestion based on pick + ban + winrate
- 🎯 Automated hero suggestion based on player account ID
- ⚡ Responsive UI using Next.js and Tailwind CSS
- 🧪 Unit tested logic for hero suggestions

## 💻 Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm
- **Testing**: Vitest / Jest
- **API**: [OpenDota Hero Stats](https://api.opendota.com/api/herostats)

## 🧰 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/dota-hero-dashboard.git
cd dota-hero-dashboard
```

### 2. Install dependencies (using `pnpm`)

Make sure you have `pnpm` installed. If not:

```bash
npm install -g pnpm
```

Then install dependencies:

```bash
pnpm install
```

### 3. Run the development server

```bash
pnpm dev
```

Visit `http://localhost:3000` to open the dashboard.

## 🧪 Running Tests

```bash
pnpm test
```

## 🗂️ Project Structure

```
src/
├── app/              # Next.js pages (App Router)
├── components/       # UI components
├── lib/              # Data processing logic
├── services/         # API fetchers
├── styles/           # Tailwind/global styles
├── tests/            # Unit tests
└── types/            # TypeScript types/interfaces
```

<!-- ## 📦 Portability

- Cross-platform compatible (Windows, macOS, Linux)
- Can optionally be containerized with Docker
- Uses `pnpm` for faster installs and deterministic lockfiles -->

## 🥷 Sample Player IDs (for demo/testing)

- `152740380`
- `80523971`