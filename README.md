# Simvestor Game App

This is a stock market simulation game where players can practice investing without risking real money.

## Features

- Start with $1,000 virtual cash
- Buy and sell stocks across different sectors
- Real-time market simulation with news events
- Portfolio tracking and performance analysis
- Interactive charts and metrics

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   ```

2. Run development server:
   ```sh
   npm run dev
   ```

3. Build for production:
   ```sh
   npm run build
   ```

## Deployment

### GitHub Pages

1. Create a new repository on GitHub
2. Initialize git and push your code:
   ```sh
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/SimVestor.git
   git push -u origin main
   ```

3. Deploy to GitHub Pages:
   ```sh
   npm run deploy
   ```

4. Enable GitHub Pages in your repository settings:
   - Go to Settings > Pages
   - Source: Deploy from a branch
   - Branch: gh-pages

Your game will be available at: https://yourusername.github.io/SimVestor/

### Firebase Hosting (Alternative)

1. Install Firebase CLI:
   ```sh
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```sh
   firebase login
   ```

3. Initialize Firebase:
   ```sh
   firebase init hosting
   ```

4. Deploy to Firebase:
   ```sh
   npm run build
   firebase deploy
   ```

## Development

- Project structure:
  - `src/` - Source code
  - `src/components/` - React components
  - `src/models/` - Game logic and data models
  - `src/contexts/` - React contexts
  - `dist/` - Built files

## Environment Setup

Create a `.env` file with your Firebase configuration:
```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

## License

MIT
