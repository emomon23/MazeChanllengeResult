import React, {Component} from 'react';
import styles from './common/Maze.css';
import MazeRowRenderer from './MazeRowRenderer';

class MazeRenderer extends Component {
    mazeData = {};

    renderMazeRows() {
        if (!(this.mazeData && this.mazeData.mazeMap))
        {
            return <tr />
        }

        const { totalRows: mazeRows, matrix } = this.mazeData.mazeMap;
        const rows = [];

        for (let r=0; r<mazeRows; r++){
            const columnData = matrix[r];
            rows.push(<MazeRowRenderer sourceData={columnData} />)
        }

        return rows;
    }

    renderSummary() {
        if (! (this.mazeData && this.mazeData.mazeMap)) {
            return <span />
        }


        return (
            <span>
               Total Rows: {this.mazeData.mazeMap.totalRows}<br/>
               Total Cols: {this.mazeData.mazeMap.totalColumns}<br/>
               Steps to Solve: {this.mazeData.stepsToResolve}
            </span>
        );
    }

    render() {
      //this was a big fat cheat to use setState
      this.mazeData = this.props.dataSource[0];

      return (
        <div style={styles.MazeRendererRootContainer}>
            { this.renderSummary() }

            <div>
                <table>
                    <tbody>
                        { this.renderMazeRows() }
                    </tbody>
                </table>

             
            </div>
        </div>
      );
    }
}

export default MazeRenderer