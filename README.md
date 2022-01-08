# pern-todo

Postgres + Express + React + Node

## 1-Time Setup

- Install Postgres - Used MacOS EDB Installer
- Setup Postgres DB

Create a database called "perntodo" then run the commands in /server/database.sql. Or with psql:

- [Install Postgres](https://www.postgresql.org/download/) - Used MacOS EDB Installer
- Setup the Postgres database - Run commands in /server/database.sql
- Clone the repository
- (Optional) Install Postman - Useful for testing the API
- Add a .env file in /server with DB_USER, DB_HOST, DB_NAME, DB_PASSWORD and their corresponding values according to your database setup (DB_NAME=perntodo if you followed the database.sql file)
- Add a .env file in /client with API_URL (for running locally, use http://localhost:5000)
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
