# Easy Travel GraphQL API Server

EasyTravel is a small travel company based in Germany, which provides unique travel and vacation products. The company collaborates with its aviation and hotel partners to bring up their unique offerings.

## Project Setup

```sh
npm install
```

## Docker for Local Development

Docker is needed to be installed on your local machine.

### Start Docker and Compile and Hot-Reload for Development

```sh
docker compose up -d
```

### Stop Docker

```sh
docker compose down
```

### SSH into docker container

In order run the commands you need to ssh into docker and then you can run commands for testing, seeding, etc.

```sh
docker compose run app /bin/bash
```

### Seed the database

```sh
npm run seed
```

### Run Unit Tests with [Jest](https://jestjs.io/)

```sh
npm run test
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
