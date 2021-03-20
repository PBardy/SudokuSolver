import React from 'react';
import Sudoku from './Sudoku';

interface AppProps { }

interface AppState { } 

export default class App extends React.Component<AppProps, AppState> {

  sudokuRef: React.RefObject<Sudoku> = React.createRef<Sudoku>();

  render() {
    return (
      <div className="app">
        <div className="top-app-bar">
          <div className="top-app-bar__group">
            <h2>Sudoku Solver</h2>
          </div>
          <div className="top-app-bar__group">
            <button onClick={() => this.sudokuRef.current?.solve()}>Solve</button>
            <button onClick={() => this.sudokuRef.current?.clear()}>Clear</button>
          </div>
        </div>
        <div className="sudoku-wrapper">
          <Sudoku ref={this.sudokuRef} />
        </div>
      </div>
    )
  }

}
