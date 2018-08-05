import _ from 'lodash';
import Maze from './Maze';

const createMazeMapAndSummary = (maze, shortestPath) => {
    if (!shortestPath || shortestPath.length === 0) {
        return {
            status: 'Unable to resolve maze'
        }
    };

    shortestPath.forEach((pathPoint) => {
        if (!maze.isThisTheEndingPoint(pathPoint)) {
            maze.markPointAsSolution(pathPoint);
        }
    });

    const mazeMap = maze.createMazeMap();

    return {
        status: 'OK',
        stepsToResolve: shortestPath.length,
        mazeMap: mazeMap
    };
}

const popOffQueue = (queue) => {
    if (queue && queue.length > 0) {
        const point = queue[queue.length - 1];
        queue.splice(queue.length - 1);

        return point;
    }
}

const findShortestPath = (maze) => {
    //this fat arrow function is based on the solution found at stack overflow
    //here: https://stackoverflow.com/questions/30551194/find-shortest-path-in-a-maze-with-recursive-algorithm
    const levelArray = maze.createLevelArray();
    const startingPoint = maze.getStartingPoint();
    const queue = [];
 
    queue.push(startingPoint);

    while (queue.length > 0) {
        const point = popOffQueue(queue);
        if (maze.isThisTheEndingPoint(point)) {
            break;
        }

        const levelValue = levelArray[point.x][point.y];
        const possibleMoves = maze.getPotentialMove(point);

        possibleMoves.forEach((potentialMove) => {
            if (maze.isMovePossible(potentialMove)) {
                if (levelArray[potentialMove.x][potentialMove.y] === 0) {
                    queue.push(potentialMove);
                    levelArray[potentialMove.x][potentialMove.y] = levelValue + 1;
                }
            }
        });
    }

    const endingPoint = maze.getEndingPoint();
    if (levelArray[endingPoint.x][endingPoint.y] === 0) {
        console.log('Unable to solve this maze');
        return null;
    }

    //Get the shortest path
    const shortestPath = [];
    let pointToAdd = endingPoint;

    while (!(maze.isThisTheStartingPoint(pointToAdd))) {
        shortestPath.push(pointToAdd);
        const level = levelArray[pointToAdd.x][pointToAdd.y];
        const possibleMoves = maze.getPotentialMove(pointToAdd);

        for (let p = 0; p < possibleMoves.length; p++) {
            const potentialMove = possibleMoves[p];

            if (maze.isMovePossible(potentialMove)) {
                if (levelArray[potentialMove.x][potentialMove.y] === level - 1) {
                    pointToAdd = potentialMove;
                    break;
                }
            }
        }
    }

    return shortestPath;
}

class MazeRunner {
    static solveMaze(maze) {
        const shortestPath = findShortestPath(maze);
        const result = createMazeMapAndSummary(maze, shortestPath);

        return result;
    }
}

export default MazeRunner;