FROM node:20-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json ./

# Install dependencies (including devDependencies for build)
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build both the client (Vite) and server (TypeScript)
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Set production environment
ENV NODE_ENV=production

# Start the server using the compiled output
CMD ["node", "dist-server/server/main.js"]
