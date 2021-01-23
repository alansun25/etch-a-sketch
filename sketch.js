const body = document.querySelector('body');
const container = document.querySelector('.container');
let gridItems = document.querySelectorAll('#grid-item');

// create initial 16-by-16 grid
createGrid(16);

// add button div
const buttons = document.createElement('div');
buttons.className = "buttons";
body.insertBefore(buttons, body.children[2]);

// add clear button
const clear = document.createElement('button');
clear.textContent = "Clear";
buttons.appendChild(clear);

// clear the grid, and prompt user for a new grid size;
clear.addEventListener('click', clearGrid);

// add new button
const newSketch = document.createElement('button');
newSketch.textContent = "New";
buttons.appendChild(newSketch);

// prompt the user to create a new grid
newSketch.addEventListener('click', () => {
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

// creates a size-by-size grid
function createGrid(size) {
    container.style.gridTemplateColumns = `repeat(${size}, auto)`;
    for (i = 0; i < size**2; i++) {
        let cell = document.createElement('div');
        cell.id = 'grid-item';
        container.appendChild(cell);
    }
    gridItems = document.querySelectorAll('#grid-item');

    // when hovering over a cell, change the background color
    gridItems.forEach((item) => {
        item.addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor = '#eba7ed';
        })
    })
}

function clearGrid() {
    for (i = 0; i < gridItems.length; i++) {
        gridItems[i].style.backgroundColor = "transparent";
    }
}


