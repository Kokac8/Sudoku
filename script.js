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

// Function to update the puzzle array when a user inputs a number
function updatePuzzleWithInput(row, col, value) {
 // Check if the entered value is between 1 and 9
  if (value >= 1 && value <= 9) {
    // Check if the number is valid in the current puzzle state
    if (isNumberValid(value, row, col, samplePuzzle)) {
      samplePuzzle[row][col] = value; // Update the puzzle array
      return true;
    }
  }
  return false;
}

// Function to push an action to the stack
function pushAction(row, col, prevValue, newValue) {
  actionStack.push({ row, col, prevValue, newValue });
  redoStack = []; // Clear redo stack on new action
}

// Undo function
function undo() {
    const action = actionStack.pop();
    if (action) {
        redoStack.push({
            row: action.row,
            col: action.col,
            prevValue: samplePuzzle[action.row][action.col],
            newValue: action.prevValue
        });
        // Revert the cell to its previous value
        samplePuzzle[action.row][action.col] = action.prevValue;
        const cell = document.getElementById(`cell-${action.row}-${action.col}`);
        cell.textContent = action.prevValue === 0 ? '' : action.prevValue;
    }
}

// Redo function
function redo() {
  const action = redoStack.pop();
    if (action) {
        pushAction(action.row, action.col, action.prevValue, action.newValue);
        // Reapply the value from the redo action
        samplePuzzle[action.row][action.col] = action.newValue;
        const cell = document.getElementById(`cell-${action.row}-${action.col}`);
        cell.textContent = action.newValue === 0 ? '' : action.newValue;
    }
}

// Check Puzzle function
function checkPuzzle() {
  for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const value = samplePuzzle[row][col];
            // Temporarily set the cell's value to 0 to exclude it from validation checks
            samplePuzzle[row][col] = 0;
            if (value !== 0 && !isNumberValid(value, row, col, samplePuzzle)) {
                alert('The puzzle is incorrect!');
                // Don't forget to reset the value after checking
                samplePuzzle[row][col] = value;
                return;
            }
            // Reset the value after checking
            samplePuzzle[row][col] = value;
        }
    }
    alert('Congratulations! The puzzle is correct!');
}

// Extend the event listener to push actions to the stack
function addEventListenersToCells() {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.getElementById(`cell-${row}-${col}`);
      if (cell.isContentEditable) {
        cell.addEventListener('input', function(event) {
          const input = event.target.innerText;
          const value = parseInt(input, 10);
          const prevValue = samplePuzzle[row][col];
          if (!isNaN(value) && updatePuzzleWithInput(row, col, value)) {
            event.target.classList.remove('invalid');
            pushAction(row, col, prevValue, value);
          } else {
            event.target.classList.add('invalid');
            setTimeout(() => { event.target.innerText = ''; }, 500);
          }
        });
      }
    }
  }
}

// Initialize the grid and event listeners
populateSudokuGrid(samplePuzzle);
addEventListenersToCells();
