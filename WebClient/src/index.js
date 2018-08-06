import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route,
    Link
  } from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MazeList from './components/mazeList/MazeList';
import NewMaze from './components/newMaze/NewMaze';

ReactDOM.render(
    ( <BrowserRouter>
        <div>
            <Route exact path="/" component={MazeList}/>
            <Route exact path="/new" component={NewMaze}/>
        </div>
    </BrowserRouter>
      ), document.getElementById('root')
);
registerServiceWorker();
