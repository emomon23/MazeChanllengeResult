import express from 'express';
import bodyParser from 'body-parser';
import MazeManager from '../logic/MazeManager';
import MazeRunner from '../logic/MazeRunner';
import Maze from '../logic/Maze';

const router = express.Router();
const mazeManager = new MazeManager('src/data/Mazes');

router.get('/', (request, response) => {

    mazeManager.getAvailableMazeNames()
        .then((fileNames) => {
            response.json({ mazes: fileNames });
        })
        .catch((error) => {
            response.status(error.status || 500)
                    .json({status: error.message || error});
        });
}); 

router.get(`/:name`, (request, response) => {
    const mazeName = request.params.name;
    mazeManager.getMaze(mazeName)
        .then((mazeDefinition) => {
            response.json(mazeDefinition);
        })
        .catch((error) => {
            response.status(error.status || 404)
                    .send(error.message || error);
        });
});


router.get('/solve/:name', (request, response) => {
    const mazeName = request.params.name;

    mazeManager.getMaze(mazeName)
        .then((mazeDefinition) => {
            const maze = new Maze(mazeDefinition.mazeString);
            const result = MazeRunner.solveMaze(maze);
            response.json(result);
        })
        .catch((error) => {
            response.status(error.status || 500)
                    .send(error.message || error);
        });
});


router.post('/', (request, response) => {
    const mazeDefinition = request.body;

    mazeManager.createNewMaze(mazeDefinition)
        .then(() => {
            response.status(200).send('OK');
        })
        .catch((error) => {
            response.status(error.status || 500)
                    .send(error.message || error);
        });
});

module.exports = router;