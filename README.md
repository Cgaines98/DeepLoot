# MockField - MTG Deck Builder (Frontend)

The frontend for MockField, a Magic: The Gathering deck-building application. This project provides a user-friendly interface to search for cards using the Scryfall API, manage decks, and toggle between light and dark modes.

## Features

- **Authentication**: Integrated with Auth0 for secure user login and logout. Uses Authorization Code Flow with PKCE and Refresh Token Rotation for enhanced security.
- **Theme Support**: Light and dark mode toggle, with automatic detection of browser preference.
- **Card Search**: Real-time card search powered by Scryfall.
- **Deck Management**: Create, edit, and delete decks. Supports both list and grid views in the editor.

## Tech Stack

- **React**: Modern UI library.
- **TypeScript**: For type safety and better developer experience.
- **Auth0 React SDK**: Authentication management.
- **Axios**: HTTP client for API requests (Backend and Scryfall).

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

Install dependencies:
   ```bash
   npm install
   ```

### Configuration

The frontend is configured to communicate with a Spring Boot backend running at `http://localhost:8080`.

Auth0 configuration is located in `src/index.tsx`:
- **Domain**: `dev-mockfield.us.auth0.com`
- **Client ID**: `KruLIQfqxnjbtKOfYrvuwGQO70BMikQV`
- **Audience**: `https://api.mockfield.com`

### Available Scripts

In the project directory, you can run:

#### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `npm run build`
Builds the app for production to the `build` folder.
