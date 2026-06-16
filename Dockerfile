# Stage 1: Build the React Application
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install all dependencies (including devDependencies for TypeScript compilation)
RUN npm ci

# Copy project files
COPY . .

# Compile and build the production assets
RUN npm run build

# Stage 2: Serve the Static Assets using Nginx
FROM nginx:alpine

# Copy the custom nginx config if we want, or just copy assets
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
