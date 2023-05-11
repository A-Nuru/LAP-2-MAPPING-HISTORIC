# README

Minimal Mapbox MVC app using postgres database

## Installation

- cd into `/api` and run `npm i` to install dependencies
- create `.env` file in `/api` folder with the environment variables `PORT=` server port (e.g. 3000), `DB_URL=` postgres db connection string - <b>database must have PostGIS extension installed</b>
- add your Mapbox API key to `client/mapboxapi.js` as follows: `export const mapboxApiToken = "MAPBOX_API_TOKEN"`

## How to run the server

- cd into `/api` 
- run `npm run setup-db` to setup the database

- run the server with `npm run dev`

## How to run the client

- cd into `/client` and run `index.html` using e.g. VS Code live server  

- run the server with `npm run dev`

