import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import MazeService from '../../services/MazeService';
import TextInput from '../common/TextInput';

class NewMaze extends React.Component {
    mazeService = new MazeService();

    state = {
        name: '',
        mazeString: '',
        errorMessage: ''
    };

    onValueChanged(stateProperty, currentValue){
        this.setState({[stateProperty]: currentValue});
    }

    onSaveClick() {
        if (this.state.name === '' || this.state.mazeString === ''){
            window.alert('You must provide a name and a maze');
            return;
        }

        this.mazeService.createNewMaze({name: this.state.name, mazeString: this.state.mazeString})
            .then(() => {
                this.props.history.goBack();
            })
            .catch((error) => {
                this.setState({errorMessage: error.message || error});
            });
    }

    onCancelClick() {
        if (window.confirm('Are you sure?')){
            this.props.history.goBack();
        }
    }

    render() {
        return (<div style={styles.rootStyle}>
                    <TextInput  label='Maze Name'
                                onTextChange={this.onValueChanged.bind(this)}
                                stateProperty='name'
                                value={this.state.name} />

                    <TextInput  label='Maze String (##A...B###)'
                                onTextChange={this.onValueChanged.bind(this)}
                                stateProperty='mazeString'
                                rows='25'
                                cols='70'
                                value={this.state.mazeString}
                                 />

                    <div style={styles.buttonContainerStyle}>
                        <span style={styles.errorMessageStyle}>{ this.state.errorMessage }</span>
                        <button style={styles.buttonStyle}
                                onClick={this.onCancelClick.bind(this)}>
                            Cancel
                        </button>

                        <button onClick={this.onSaveClick.bind(this)}
                                style={styles.buttonStyle}>
                            Save
                        </button>
                    </div>
                </div>)
    }
}

const styles = {
    rootStyle: {
        width: 700,
    },
    buttonContainerStyle: {
        width: '90%',
        textAlign: 'right'
    },
    buttonStyle: {
        width: 80,
        height: 35,
        marginLeft: 10,
        fontSize: 14
    },
    errorMessageStyle: {
        color: 'red',
        fontWeight: 'bold'
    }
}

export default withRouter(NewMaze);