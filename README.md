# Messenger WebSocket Chat

A real-time, multi-channel chat application built with React, Socket.io, and Radix UI. This project demonstrates a decentralized architecture where individual chat containers manage their own WebSocket connections and state independently.

![Screenshot of the Application](https://via.placeholder.com/800x450?text=Messenger+WebSocket+Chat)

## 🚀 Features

- **Real-Time Messaging**: Bidirectional communication powered by Socket.io.
- **Multi-Channel Support**: Seamlessly switch between `Project Group`, `Social`, and `Feedback` channels.
- **Decentralized State**: Each chat container maintains its own local state and message history.
- **Modular Architecture**: 
  - **Custom Hook**: `useSocket` encapsulates all WebSocket logic, making components cleaner.
  - **Radix UI**: Premium design system for a sleek, glassmorphism-inspired aesthetic.
- **Responsive Layout**: Fluid grid system that adapts to different screen sizes.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Radix UI Themes, Lucide Icons
- **Backend**: Node.js, Express, Socket.io
- **Integration**: Vite-Express for unified development and production builds

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:mugen-kaizen/websockets.git
   cd websockets
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## 📂 Project Structure

- `src/client/`: Frontend React application.
  - `components/`: Reusable UI components (e.g., `ChatContainer`).
  - `hooks/`: Custom React hooks (e.g., `useSocket`).
- `src/server/`: Express server and WebSocket handlers.
  - `sockets/`: Modularized Socket.io logic.
- `src/shared/`: (Optional) Shared types and utilities between client and server.

## 📄 License

MIT
