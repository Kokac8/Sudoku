// A pre-defined puzzle for illustration purposes
// 0 represents an empty cell
const samplePuzzle = [
  // ... (sample puzzle remains unchanged)
];

// Stack to keep track of user actions for undo and redo
let actionStack = [];
let redoStack = [];

// Function to populate the grid with a Sudoku puzzle
function populateSudokuGrid(puzzle) {
  // ... (populate function remains unchanged)
}

// Function to check if a number can be placed in a cell
function isNumberValid(number, row, col, puzzle) {
  // ... (validation function remains unchanged)
}

// Function to update the puzzle array when a user inputs a number
function updatePuzzleWithInput(row, col, value) {
  // ... (update function remains unchanged)
}

// Function to push an action to the stack
function pushAction(row, col, prevValue, newValue) {
  actionStack.push({ row, col, prevValue, newValue });
  redoStack = []; // Clear redo stack on new action
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
