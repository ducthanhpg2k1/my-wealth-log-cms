# Stage 1: Build the application
FROM node:20-alpine AS builder

# Install Git
RUN apk add --no-cache git

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm i --legacy-peer-deps

# Copy the rest of the application code
COPY . .


# Fix the application
RUN npm run lint:fix

# Build the application
RUN npm run build

# Stage 2: Serve the application
FROM node:20-alpine AS production

# Set environment variables
# ENV NODE_ENV=production

# Set the working directory
WORKDIR /app

# Copy necessary files from the builder stage
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# Install production dependencies
RUN npm i --legacy-peer-deps

# Expose port 3000
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]