import React, {Component} from 'react';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css';
import styles from './MazeList.css';

class MazeNameList extends Component {
    onNameChange(value) {
        this.props.onMazeNameSelected(value);
    }

    render() {
        return (
            <div style={styles.MazeListNameContainerStyle}>
                <div style={styles.MazeListNameLabelStyle}>
                    Available Mazes
                </div>

                <div style={styles.MazeListNameElementContainerStyle}>
                    
                    <Dropdown options={this.props.source}
                            value={this.props.value}
                            onChange={this.onNameChange.bind(this)}
                            placeholder='Please Select a Maze to Solve' />
                </div>

                <div style={styles.MazeListNameElementContainerStyle}>
                    <button style={styles.MazeListNameButtonStyle}>
                        New Maze!
                    </button>
                </div>
            </div>
        )
    }
}

export default MazeNameList;
