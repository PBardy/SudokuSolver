import React from 'react';

interface SudokuCellProps {
  row: number;
  column: number;
  value: string | number;
  onChange: (row: number, column: number, value: number) => void;
}

interface SudokuCellState {}

export default class SudokuCell extends React.Component<SudokuCellProps, SudokuCellState> {

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    
  }

  handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace") {
      return this.props.onChange(this.props.row, this.props.column, 0);
    }

    const value = Number.parseInt(event.key);
    if (!Number.isNaN(value)) {
      const input = event.target as HTMLInputElement;
      if (input != null) {
        this.props.onChange(this.props.row, this.props.column, value);
      }
    }
  }

  render() {
    return (
      <input 
        min={1} 
        max={9} 
        type="number" 
        className="cell"
        onChange={this.handleChange.bind(this)} 
        onKeyDown={this.handleKeyDown.bind(this)}
        value={this.props.value !== 0 ? this.props.value: ""} />)
  }

}