import React from 'react';
import SudokuCell from './SudokuCell';
import { INVALID_SOLUTION, DEFAULT_SUDOKU, EMPTY_SUDOKU, solve } from '../services/SudokuSolver';

interface SudokuProps { }

interface SudokuState {
  grid: number[][];
}

export default class Sudoku extends React.Component<SudokuProps, SudokuState> {

  state: SudokuState = {
    grid: DEFAULT_SUDOKU,
  }

  copy(grid: number[][]): number[][] {
    const newGrid: number[][] = [];
    for (let i = 0; i < grid.length; i++) {
      newGrid[i] = [];
      for (let j = 0; j < grid[i].length; j++) {
        newGrid[i][j] = grid[i][j];
      }
    }

    return newGrid;
  }

  solve() {
    const copy = this.copy(this.state.grid);
    const solved = solve(copy);
    if (solved !== INVALID_SOLUTION) {
      this.setState({ grid: solved });
    }
  }

  clear() {
    const copy = this.copy(EMPTY_SUDOKU);
    console.log(copy);
    this.setState({ grid: copy });
  }

  handleCellChange(row: number, column: number, value: number) {
    const grid = [...this.state.grid];
    grid[row][column] = value;
    this.setState({ grid: grid });
  }

  getEmptyGrid() {
    const grid: number[][] = [];
    for (let row = 0; row < 9; row++) {
      grid[row] = [];
      for (let column = 0; column < 9; column++) {
        grid[row][column] = 0;
      }
    }

    return grid;
  }

  getSquares() {
    const squares: JSX.Element[] = [];
    for (let squareRow = 0; squareRow < 3; squareRow++) {
      for (let squareColumn = 0; squareColumn < 3; squareColumn++) {
        const cells: JSX.Element[] = [];
        const key: number = (squareRow * 3) + squareColumn;
        for (let relativeRow = 0; relativeRow < 3; relativeRow++) {
          for (let relativeColumn = 0; relativeColumn < 3; relativeColumn++) {
            const row: number = (squareRow * 3) + relativeRow;
            const column: number = (squareColumn * 3) + relativeColumn;
            const value: number = this.state.grid[row][column];
            const key: number = (row * 9) + column;
            cells.push(<SudokuCell value={value} key={key} row={row} column={column} onChange={this.handleCellChange.bind(this)} />);
          }
        }
        squares.push(<div className="square" key={key}>{cells}</div>);
      }
    }

    return squares;
  }

  render() {
    return (<div className="sudoku">{this.getSquares()}</div>)
  }

}