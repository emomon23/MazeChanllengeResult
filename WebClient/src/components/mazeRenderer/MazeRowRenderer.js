import React, { Component } from 'react';
import styles from './common/Maze.css';

import {
    StartingPoint,
    DestinationPoint,
    Open,
    Wall,
    SolutionPath,
    STARTING_POINT_CHAR,
    DESTINATION_POINT_CHAR,
    OPEN_CHAR,
    SOLUTION_PATH_CHAR,
    WALL_CHAR
} from './common';

class MazeRowRenderer extends Component {
    renderColumns() {
        const { sourceData: characters } = this.props;
        const columnsArray = [];

        characters.forEach(character => {
            switch (character) {
                case (STARTING_POINT_CHAR):
                    columnsArray.push(<StartingPoint />);
                    break;
                case (DESTINATION_POINT_CHAR):
                    columnsArray.push(<DestinationPoint />);
                    break;
                case (OPEN_CHAR):
                    columnsArray.push(<Open />);
                    break;
                case (WALL_CHAR):
                    columnsArray.push(<Wall />);
                    break;
                case (SOLUTION_PATH_CHAR):
                    columnsArray.push(<SolutionPath />);
                    break;
            }

        });

        return columnsArray;
    }

    render() {
        return (<tr style={styles.MazeRow}>
                {this.renderColumns()}
            </tr>);
    }
}

export default MazeRowRenderer