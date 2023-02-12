// document.body.onload = createGrid;
const grid = document.getElementById('canvas')

// Detect Mouse Input
let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

// Eraser
const eraserBtn = document.getElementById('eraserBtn')
eraserBtn.onclick = () => setCurrentMode('eraser')

// Reset
const clearBtn = document.getElementById('clearBtn')
clearBtn.onclick = () => reloadGrid()

// Random Color
const rainbowBtn = document.getElementById('randBtn')
rainbowBtn.onclick = () => setCurrentMode('rainbow')

// Color Mode
const colorBtn = document.getElementById('colorBtn')
colorBtn.onclick = () => setCurrentMode('color')

// Pick Color
const DEFAULT_COLOR = '#d1d1d1'
const DEFAULT_MODE = 'color'
const DEFAULT_SIZE = 16

let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE

const colorPicker = document.getElementById('colorPicker')
colorPicker.oninput = (e) => setCurrentColor(e.target.value)

function setCurrentColor(newColor) {
    currentColor = newColor
}

function setCurrentMode(newMode) {
    activateButton(newMode)
    currentMode = newMode
}

function setCurrentSize(newSize) {
    currentSize = newSize
}

// Create Grid
function createGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div')
        gridElement.classList.add('grid-element')
        gridElement.addEventListener('mouseover', changeColor)
        gridElement.addEventListener('mousedown', changeColor)
        grid.appendChild(gridElement)
    }
}

// Stores Color
function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    if (currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode === 'color') {
        console.log(currentColor)
        e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = '#272727'
    }
}

function activateButton(newMode) {
    if (currentMode === 'rainbow') {
        rainbowBtn.classList.remove('active')
    } else if (currentMode === 'color') {
        colorBtn.classList.remove('active')
    } else if (currentMode === 'eraser') {
        eraserBtn.classList.remove('active')
    }

    if (newMode === 'rainbow') {
        rainbowBtn.classList.add('active')
    } else if (newMode === 'color') {
        colorBtn.classList.add('active')
    } else if (newMode === 'eraser') {
        eraserBtn.classList.add('active')
    }
}

function reloadGrid() {
    clearGrid()
    console.log(currentSize)
    const sizeValue = document.getElementById('sizeInput').value
    currentSize = sizeValue
    if (sizeValue >= 65 || sizeValue < 1) {
        currentSize = 16
    }
    console.log(sizeValue)
    createGrid(currentSize)
}

function clearGrid() {
    grid.innerHTML = ''
}

window.onload = () => {
    createGrid(DEFAULT_SIZE)
    activateButton(DEFAULT_MODE)
}