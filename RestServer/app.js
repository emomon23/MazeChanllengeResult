import express from 'express';
import bodyParse from 'body-parser';
import path from 'path';
import MazeRoute from './src/routes/MazeRoute';

const port = 55406;
const server = express();
const buildURL = (version, path) => `/api/${version}/${path}`;

const BASE_MAZE_ROUTE = buildURL('v1', 'mazes');

server.use(bodyParse.json());
server.use(BASE_MAZE_ROUTE, MazeRoute);

server.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
})