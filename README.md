# pern-todo

This is a simple todo application using React + Postgres + Express + Node.

It was developed as a practice app for learning web development with these technologies. The repository has multiple branches, with each one introducing more features and complexity.

You can use this app as a sample app for any learning you may be interested in. For example, Quality Engineers can use this to run a simple app locally and practice various automated testing technologies against it.

## One-Time Setup

- [Install Postgres](https://www.postgresql.org/download/) - Used MacOS EDB Installer
- Setup the Postgres database - Run commands in /server/database.sql
- Clone the repository
- (Optional) Install Postman - Useful for testing the API
- Add a .env file in /server with DB_USER, DB_HOST, DB_NAME, DB_PASSWORD and their corresponding values according to your database setup (DB_NAME=perntodo if you followed the database.sql file)
- Add a .env file in /client with API_URL (for running locally, use http://localhost:5000)
- Install nodemon globally

```bash
npm install nodemon -g
```

## Development

In the top level directory:

```bash
npm install
npm run start
```
