# postgrest-express
Standalone Express.js web server that automatically creates and serves a RESTful API from any PostgreSQL database

## Installation
Just like any other node app, you just need to install all the required node modules using `npm install`

## Connection
To connect to your PostgreSQL database edit the `config/database.js` file and enter you connection details.

An example is shown below:
```
const db = {
  user: 'postgres-username',
  host: 'localhost',
  database: 'test-db',
  password: 'secure-password',
  port: 5432,
}

module.exports = db
```

## Execution
To launch your API just type `npm run serve`. This will run your Express.js server using `nodemon`, so any file changes will automatically trigger a process restart.

## Features
postgrest-express currently supports GET, POST and PATCH calls (no DELETE just yet). The supported operators (eq, gt, gte, lt, lte, neq, like, ilike, in, is) can be used just like you would with postgREST, in both GET and PATCH calls. Also `prefer` and `range` header options are supported to make pagination easy. Please refer to the postgREST manual (https://postgrest.org/en/v7.0.0/api.html) for details on the above operators and header options. More detailed documentation will be added here in due time.