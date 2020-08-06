let grid = document.getElementById('grid');
let brushColor = 'default';


const reset = document.getElementById('reset');
const resize = document.getElementById('resize');
const colors = document.getElementById('colors');
const shades = document.getElementById('fadeIn');
const standard = document.getElementById('black');


reset.addEventListener('click', clearSquares);
resize.addEventListener('click', resizeGrid);
colors.addEventListener('click', brushSet => brushColor = 'random');
shades.addEventListener('click', brushSet => brushColor = 'greyScale');
standard.addEventListener('click', brushSet => brushColor = 'default');


function createGrid(rowCol) {
    grid.style.setProperty('--grid-rows', rowCol);
    grid.style.setProperty('--grid-cols', rowCol);

    for(let i=0; i<(rowCol*rowCol); i++) {
        let newDiv = document.createElement('div');
        newDiv.classList.add('square');
        newDiv.addEventListener('mouseover', colorChange);
        grid.appendChild(newDiv);
    }
}

function clearSquares() {
    document.querySelectorAll('.square').forEach(square => {
        square.classList.remove('default');
        square.classList.remove('random');
        square.classList.remove('greyScale');
        brushColor = 'default';
    })
}

function resizeGrid() {
    let size = Number(prompt("Please enter the desired grid size:\n(e.g., 16 will result in a 16x16 grid)", '16'));


    if(isNaN(size)===true || size <= 0) {
        size=16;
    }


    grid.remove();
    grid = document.createElement('div');
    grid.id='grid';

    let container = document.getElementById('container');
    container.appendChild(grid);
    createGrid(size);
}


function colorChange(e) {
    if(brushColor === 'default') {
        e.target.classList.add('default');
        e.target.classList.remove('random');
        e.target.classList.remove('greyScale');
    }
    else if(brushColor === 'random') {
        randomColors(e);
    }
    else if (brushColor === 'greyScale') {
        fadeIn(e);
    }
}

function randomColors(e) {
    let color = '#'+Math.floor(Math.random()*16777215).toString(16);
        e.target.style.setProperty('--rand-hex', color);
        e.target.classList.add('random');
        e.target.classList.remove('greyScale');
}


function fadeIn(e) {
    e.target.classList.add('greyScale');
    e.target.classList.remove('random')
    let currentOpacity = Number(window.getComputedStyle(e.target).getPropertyValue("opacity"));
    if(currentOpacity <1){
        currentOpacity += 0.1;
        e.target.style.setProperty('--fade-in', currentOpacity);
    }
}


createGrid(16);
