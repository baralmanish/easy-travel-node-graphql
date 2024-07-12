# Use the official Node.js image from Docker Hub
FROM node:latest

# Set working directory inside the container
WORKDIR /src

# Copy package.json and package-lock.json to WORKDIR
COPY package.json .
COPY package-lock.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code to WORKDIR
COPY . .

# Expose port 4000 (or the port your application runs on)
EXPOSE 4000

# Command to run your application using Node.js
CMD ["npm", "run", "dev"]