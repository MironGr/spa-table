# Presets

1. Run PostgresSQL 
2. Create a table:
  ```
    CREATE TABLE summary (
    ID SERIAL PRIMARY KEY,
    name VARCHAR(80),
    count INTEGER,
    distance INTEGER,
    date date
  );
  ```
3. Import file 'data' to the table
4. Fill .env-example in ./src/backend and rename that to .env
5. Type a PORT from .env in "proxy": "http://localhost:PORT" from package.json
5. In ./ `yarn install` 
6. and ./src/backend `yarn install` 
## Available Scripts

start fronend in ./
### `yarn start`

start backend in ./src/backend
### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
