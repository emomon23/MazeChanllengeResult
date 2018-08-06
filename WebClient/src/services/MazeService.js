const createPostPayload = (data) => {
    const payLoad = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    return payLoad;
};

export default class MazeService {
    REST_SERVICE_PORT = 55406;
    BASE_URL = `http://localhost:${this.REST_SERVICE_PORT}/api/v1/mazes`;

    getAvailableMazeNames() {
        const promise = new Promise((resolve, reject) => {
            fetch(this.BASE_URL)
                .then((response) => response.json())
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                })
        });

        return promise;
    }

    getMazeSolution(mazeName) {
        const url = `${this.BASE_URL}/solve/${mazeName}`;
        const promise = new Promise((resolve, reject) => {
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                })
        });

        return promise;
    }

    getMazeDefinition(mazeName) {
        const url = `${this.BASE_URL}${mazeName}`;
        const promise = new Promise((resolve, reject) => {
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                })
        });

        return promise;
    }

    createNewMaze(mazeDefinition) {
       const payload = createPostPayload(mazeDefinition);
       const promise = new Promise((resolve, reject) => {
        
       fetch(this.BASE_URL, payload)
            .then((response) => response.json())
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            })
        });

        return promise;
    }
}
