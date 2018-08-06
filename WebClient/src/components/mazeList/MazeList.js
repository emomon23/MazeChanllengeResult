import React, {Component} from 'react';
import styles from './MazeList.css';
import MazeRenderer from '../mazeRenderer/MazeRenderer';
import MazeNameList from './MazeNameList';
import MazeService from '../../services/MazeService';

class MazeList extends Component {
    mazeService = new MazeService();

    state = {
        availableMazeNames: [],
        currentlySelectedMazeName: '',
        currentMazeSolution: [],
        isLoading: false
    };

    componentDidMount() {
        this.mazeService.getAvailableMazeNames()
            .then((result)=> {
                this.setState({availableMazeNames: result.mazes});
            })
            .catch((error) => {
                console.log(error || error.message);
            });
    }

    onMazeNameChanged(selectedMazeName) {
        const {value: mazeName} = selectedMazeName;

        this.setState({isLoading: true, currentlySelectedMazeName: selectedMazeName});

        this.mazeService.getMazeSolution(mazeName)
            .then((result) => {
               const tempArray = [result];
               this.setState({currentMazeSolution: tempArray});
            })
            .finally(() => {
                this.setState({isLoading: false});
            })
    }

    render(){
        return (<div>
                    <div style={styles.NewBlockStyle}>
                        <MazeNameList onMazeNameSelected={this.onMazeNameChanged.bind(this)}
                                source={this.state.availableMazeNames}
                                value={this.state.currentlySelectedMazeName} />
                    </div>
                 
                    <div style={styles.NewBlockStyle}>
                        <MazeRenderer dataSource={this.state.currentMazeSolution} />
                    </div>
               </div>);
    }

}

export default MazeList;