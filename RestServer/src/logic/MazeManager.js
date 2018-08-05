import fs from 'fs';
import path from 'path';
import _ from 'lodash';

class MazeManager {
    constructor(pathToMazeFiles){
        this.sourcePath = pathToMazeFiles;
    }

    getAvailableMazeNames(){
        const { sourcePath } = this;
        
        const promise = new Promise((resolve, reject) => {
            fs.readdir(sourcePath, (err, files)=> {
                if (err){
                    reject(error);
                }
                else {
                    const fileNames = _.map(files, (file) => file.replace('.txt', ''));
                    resolve(fileNames); 
                }
            });
        });

        return promise;
    }

    getMaze(mazeName){
        const mazePath = path.join(this.sourcePath, `${mazeName}.txt`);
       
        const promise = new Promise((resolve, reject) => {
            if (this.checkIfMazeExists(mazeName)) {
                fs.readFile(mazePath, (err, data) => {
                    if (err){
                        reject(error);
                    }
                    else {
                        resolve({name: mazeName, mazeString: data.toString()});
                    }
                });
            }
            else {
                reject(`Can't find maze '${mazeName}'`);
            }
        });

        return promise;
    }

    checkIfMazeExists(mazeName){
        const mazePath = path.join(this.sourcePath, `${mazeName}.txt`);
        return fs.existsSync(mazePath);
    }

    createNewMaze(mazeDefinition){
        const mazePath = path.join(this.sourcePath, `${mazeDefinition.name}.txt`);

        const promise = new Promise((resolve, reject) => {
            if (fs.existsSync(mazePath)){
                reject(`Unable to create new maze, '${mazeDefinition.name}' already exists`);
            }

            fs.writeFile(mazePath, mazeDefinition.mazeString, (err) => {
                if (err){
                    reject(err);
                }

                resolve();
            });
        });

        return promise;
    }

    validateMaze(mazeDefinition){
        const promise = new Promise((resolve, reject) => {
            //To be implemented
            resolve(); //for now
        });

        return promise;
    }
}

export default MazeManager;