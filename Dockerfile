# Use the official Node.js image from Docker Hub
FROM node:latest

# Set working directory inside the container
WORKDIR /home/node/app

# Copy package.json and package-lock.json to WORKDIR
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to WORKDIR
COPY . .