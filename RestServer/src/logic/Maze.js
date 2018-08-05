import _ from 'lodash';

const WALL_CHAR = '#';
const OPEN_CHAR = '.';
const PATH_SOLUTION_CHAR = '*';
const START_CHAR = 'A';
const DESTINATION_CHAR = 'B';

const initializeNewMaze = (arrayOfStringRows) => {
    let numberOfColumns = 0;
    
    //Find the longest row in the array of string rows
    arrayOfStringRows.forEach(row => {
        if (row.length > numberOfColumns){
            numberOfColumns = row.length;
        }
    });

    const result = [];
    arrayOfStringRows.forEach(function(row){
        const aRowOfWalls = Array(numberOfColumns).fill(WALL_CHAR);
        result.push(aRowOfWalls);
    });

    return result;
}

const convertMazeStringToMatix = (mazeString) => {
    const rows = mazeString.split('\n');
  
    //based on the mazeString provided, create a 2 dimensional array, initialized to ALL WALLS
    const resultMatrix = initializeNewMaze(rows);
   
    let startingPoint, endingPoint = {};
    
    //Now, for the character provided by the maze string, replace the 'walls' with
    //the 'open' values given.
    for (let r=0; r < rows.length; r++) {
        const charArray = rows[r].split('');
               
        for(let p=0; p < charArray.length; p++) {
            let character = charArray[p];
            
            if (character === OPEN_CHAR || character === START_CHAR || character === DESTINATION_CHAR){
                resultMatrix[r][p] = character;

                if (character === START_CHAR){
                    startingPoint = { x: r, y: p, character: START_CHAR, stepCount: 0 };
                }
                else if (character == DESTINATION_CHAR){
                    endingPoint = {x: r, y: p, character: DESTINATION_CHAR };
                }
            }
        }
    }
   
    return { matrix: resultMatrix, startingPoint: startingPoint, endingPoint: endingPoint };
}

class Maze {
    constructor(mazeString) {
        if (mazeString.indexOf('A') === -1 || mazeString.indexOf('B') === -1){
            console.log(`Can't find start and or end of maze.  ${mazeString}`);
            throw 'Maze is mising a Starting Points and/or a Destination';
        }
        
        const { matrix, startingPoint, endingPoint } = convertMazeStringToMatix(mazeString);
        this.rawMazeString = mazeString;
        this.matrix = matrix;
        this.startingPoint = startingPoint;
        this.endingPoint = endingPoint;
    }

    getStartingPoint() {
       return this.startingPoint;
    }

    getEndingPoint() {
        return this.endingPoint;
    }

    isThisTheEndingPoint(point) {
        const ep = this.endingPoint;
        return ep.x === point.x && ep.y == point.y;
    }

    isThisTheStartingPoint(point) {
        const {x, y} = this.startingPoint;
        return x === point.x && y==point.y;
    }

    isMovePossible(point) {
        if ((point.x < 0 || point.x >= this.matrix.length) || point.y < 0 || point.y >= this.matrix[0].length){
            return false;
        }

        const char = this.matrix[point.x][point.y];
        return char === OPEN_CHAR || char === DESTINATION_CHAR || START_CHAR;
    }

    createLevelArray() {
       let result = initializeNewMaze(this.rawMazeString.split('\n'));
      
       for (let r=0; r<this.matrix.length; r++){
            for (let c=0; c<this.matrix[0].length; c++) {
                const mazeChar = this.matrix[r][c];

                if (mazeChar === OPEN_CHAR || mazeChar === DESTINATION_CHAR) {
                   result[r][c] = 0;
                }
                else {
                   result[r][c] = -1;
                }
            }
        }
        
        const startingPoint = this.getStartingPoint();
        result[startingPoint.x][startingPoint.y] = 1;
        return result;
    }

    getPotentialMove(point) {
        const result = [{x: point.x, y: point.y + 1},
                        {x: point.x-1, y: point.y}, 
                        {x: point.x, y: point.y - 1}, 
                        {x: point.x+1, y: point.y}];

        return result;
    }

    markPointAsSolution(point) {
        const {x, y} = this.startingPoint;

        if (!(x==point.x && y==point.y)){
            this.matrix[point.x][point.y] = PATH_SOLUTION_CHAR
        }
    }
    
    convertMatrixBackToAString() {
        let result='';

        for (let r=0; r<this.matrix.length; r++){
            for (let c=0; c<this.matrix[0].length; c++){
                result += this.matrix[r][c];
            }

            result += '\n';
        }

        return result;
    }

    createMazeMap() {
        const result = {
            totalRows: this.matrix.length,
            totalColumns: this.matrix[0].length,
            matrix: this.matrix            
        };
       
        return result;
    }
}

export default Maze;