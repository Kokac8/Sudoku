// A pre-defined puzzle for illustration purposes
// 0 represents an empty cell
const samplePuzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

// Stack to keep track of user actions for undo and redo
let actionStack = [];
let redoStack = [];

// Function to populate the grid with a Sudoku puzzle
function populateSudokuGrid(puzzle) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.getElementById(`cell-${row}-${col}`);
      if (puzzle[row][col] !== 0) {
        cell.textContent = puzzle[row][col];
        cell.contentEditable = false;
      } else {
        cell.textContent = '';
        cell.contentEditable = true; // Make the cell editable
      }
    }
  }
}

// Function to check if a number can be placed in a cell
function isNumberValid(number, row, col, puzzle) {
  // Check the row and column
  for (let i = 0; i < 9; i++) {
    if (puzzle[row][i] === number || puzzle[i][col] === number) {
      return false;
    }
  }

  // Check the 3x3 subgrid
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if (puzzle[r][c] === number) {
        return false;
      }
    }
  }

  return true; // Number can be placed
}

// Function to update the puzzle array when a user inputs a number
function updatePuzzleWithInput(row, col, value) {
  // ... (update function remains unchanged)
}

// Function to push an action to the stack
function pushAction(row, col, prevValue, newValue) {
  // ... (push action function remains unchanged)
}

// Undo function
function undo() {
  // ... (undo function remains unchanged)
}

// Redo function
function redo() {
  // ... (redo function remains unchanged)
}

// Check Puzzle function
function checkPuzzle() {
  // ... (check puzzle function remains unchanged)
}

// Extend the event listener to push actions to the stack
function addEventListenersToCells() {
  // ... (event listeners function remains unchanged)
}

// Initialize the grid and event listeners
populateSudokuGrid(samplePuzzle);
addEventListenersToCells();
