import express from 'express';
import bodyParser from 'body-parser';
import MazeManager from '../logic/MazeManager';
import MazeRunner from '../logic/MazeRunner';
import Maze from '../logic/Maze';

const router = express.Router();
const mazeManager = new MazeManager('src/data/Mazes');

const returnError = (response, error, status=500) => {
    response.status(status).send(error.message || error);
}

router.get('/', async (request, response) => {
    try {
        const fileNames = await mazeManager.getAvailableMazeNames();
        response.json({ mazes: fileNames });
    }
    catch(error) {
        returnError(response, error);
    }
}); 

router.get(`/:name`, async (request, response) => {
    try {
        const mazeName = request.params.name;
        const mazeDefinition = await mazeManager.getMaze(mazeName);

        response.json(mazeDefinition);
    }
    catch(error) {
        returnError(response, error, 401);
    }
});


router.get('/solve/:name', async (request, response) => {
    try {
        const mazeName = request.params.name;
        const mazeDefinition = await mazeManager.getMaze(mazeName);
        const maze = new Maze(mazeDefinition.mazeString);
    
        const mazeSolution = MazeRunner.solveMaze(maze);
        response.json(mazeSolution);
    }
    catch(error) {
        returnError(response, error);
    }
});


router.post('/', async (request, response) => {
    try {
        const mazeDefinition = request.body;
        await mazeManager.createNewMaze(mazeDefinition);

        response.status(200).send('OK');
    }
    catch(error) {
        returnError(response, error);
    }
});     

module.exports = router;