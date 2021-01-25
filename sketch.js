const body = document.querySelector('body');
const container = document.querySelector('.container');
let gridItems = document.querySelectorAll('#grid-item');
let isDrawing = false;

// create initial 16-by-16 grid
createGrid(16);

// add button div
const buttons = document.createElement('div');
buttons.className = "buttons";
body.insertBefore(buttons, body.children[3]);

// add new button
const newSketch = document.createElement('button');
newSketch.textContent = "New";
buttons.appendChild(newSketch);

// prompt the user to create a new grid
newSketch.addEventListener('click', () => {
    isDrawing = false;
    let newGrid = prompt("Please enter the size of a new grid (1-100):");

    if (newGrid === null) {
        return;
    }

    while (newGrid > 100 || newGrid < 1 || isNaN(newGrid)) {
        newGrid = prompt("Invalid value. Try again: ");
        if (newGrid === null) {
            return;
        }
    }

    container.innerHTML = '';
    createGrid(newGrid);
})

// add clear button
const clear = document.createElement('button');
clear.textContent = "Clear";
buttons.appendChild(clear);

// clear the grid, and prompt user for a new grid size;
clear.addEventListener('click', clearGrid);

// creates a size-by-size grid
function createGrid(size) {
    container.style.gridTemplateColumns = `repeat(${size}, auto)`;
    for (let i = 0; i < size**2; i++) {
        let cell = document.createElement('div');
        cell.id = 'grid-item';
        container.appendChild(cell);
    }
    gridItems = document.querySelectorAll('#grid-item');

    // when draw mode is on, hovering over a cell will change the background color
    gridItems.forEach((item) => {
        item.addEventListener('mousedown', (e) => {
            if (!isDrawing) {
                isDrawing = true;
                e.target.style.backgroundColor = randomColor();
            }
            else isDrawing = false;
        })

        item.addEventListener('mousemove', (e) => {
            if (!isDrawing) return;
            e.target.style.backgroundColor = randomColor();
        })
    })
}

function clearGrid() {
    isDrawing = false;
    for (let i = 0; i < gridItems.length; i++) {
        gridItems[i].style.backgroundColor = "transparent";
    }
}

function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}


