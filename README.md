# pern-todo

Postgres + Express + React + Node

## 1-Time Setup

- Install Postgres - Used MacOS EDB Installer
- Setup Postgres DB

Create a database called "perntodo" then run the commands in /server/database.sql. Or with psql:

```bash
psql -U postgres -d perntodo -f database.sql
```

- Install Postman
- Install nodemon globally

```bash
npm i nodemon -g
```

## Development

```bash
npm install
```

## Running the app

Run the server:

```bash
cd server
npm start
```

The server is now running on localhost:5000.

Run the client:

```bash
cd client
npm start
```
