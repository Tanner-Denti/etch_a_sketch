// ---------------------------------------------- Globals ----------------------------------------------
let mode = 'Regular Mode';
const startingOpacity = '0.0';

// ---------------------------------------- Function Definitions ---------------------------------------

function removeAllChildNodes(parent) {
    // Helper function to remove the nodes inside of a div.

    parent.innerHTML = '';
}

function populateSketchContainer() {
    // Adds the proper number of "pixels" to the etch-a-sketch.

    const value = document.querySelector('.slider').value
    const sketchContainer = document.querySelector(".sketch-container");
    removeAllChildNodes(sketchContainer);

    for (let i = 0; i < value; i++)
    {
        for (let j = 0; j < value; j++) 
        {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            pixel.style.width = `${500/value}px`;
            pixel.style.height = `${500/value}px`;
            pixel.style.boxSizing = 'border-box';
            pixel.style.backgroundColor = 'white';
            pixel.style.opacity = startingOpacity;
            
            sketchContainer.appendChild(pixel);
        }
    }
}

function adjustSliderGradient(e) {
    // Callback to adjust the slider color on input.

    const slider = e.target;

    const sliderValue = slider.value;
    const sliderMin = slider.min;
    const sliderMax = slider.max;

    const gradientValue = (sliderValue-sliderMin)/(sliderMax-sliderMin)*100;
    slider.style.background = 'linear-gradient(to right, #3c3c41 0%, #3c3c41 ' + gradientValue + '%, #fff ' + gradientValue + '%, white 100%)';
}

function adjustSliderText(e) {
    // Callback to adjust the slider text on input.

    const sliderValue = e.target.value;
    const sliderLabel = document.querySelector('.slider-label');

    sliderLabel.innerText = `${sliderValue} x ${sliderValue}`;
}

function getRandomNumber(Max) {
    // Supply a random number.

    return Math.floor(Math.random() * Max);
}

function getRandomColor() {
    // Supply a random rgb value.

    const r = getRandomNumber(255)
    const g = getRandomNumber(255)
    const b = getRandomNumber(255)
    
    return `rgb(${r}, ${g}, ${b})`
}

function mark(e) {
    // Callback to set the mark type of the etch-a-sketch on mouseover.

    const pixel = e.target;

    if (mode == document.querySelector('.regular-btn').innerText) {
        pixel.style.opacity = '1';
        pixel.style.backgroundColor = '#3c3c41';
    } else if (mode == document.querySelector('.brush-btn').innerText) { 
        if (parseFloat(pixel.style.opacity) < 1) {
            // Add to the opacity to give a brush stroke effect.
            let opacity = parseFloat(pixel.style.opacity);
            opacity += 0.20;
            pixel.style.opacity = `${opacity}`;
        } else if (parseFloat(pixel.style.opacity) == 1 && pixel.style.backgroundColor != 'rgb(60, 60, 65)') {
            // When the color doesn't match our brush, override it and reset opacity. 
            pixel.style.opacity = startingOpacity;
            pixel.style.backgroundColor = '#3c3c41'
        }
        pixel.style.backgroundColor = '#3c3c41';
    } else if (mode == document.querySelector('.color-btn').innerText) {
        pixel.style.opacity = '1';
        pixel.style.backgroundColor = getRandomColor();
    } else if (mode == document.querySelector('.eraser-btn').innerText) {
        pixel.style.opacity = '1';
        pixel.style.backgroundColor = 'white';
    } 
}

function startDrawing() {
    // Callback to enable marking on the etch-a-sketch on click.

    let pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        pixel.addEventListener('mouseover', mark);
    });
}

function stopDrawing() {
    // Callback to disable marking on the etch-a-sketch on click-release.

    let pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        pixel.removeEventListener('mouseover', mark);
    });
}

function clear() {
    // Set all etch-a-sketch pixels to be blank.

    let pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        pixel.style.backgroundColor = 'white';
        pixel.style.opacity = startingOpacity;
    });
}

function emphasizeButton(e) {
    // Callback to engage a hover effect.

    e.target.style.backgroundColor = '#3c3c41';
    e.target.style.color = 'white';
}

function deEmphasizeButton(e) {
    // Callback to disengage a hover effect.

    if (mode != e.target.innerText) {
        e.target.style.backgroundColor = 'white';
        e.target.style.color = '#3c3c41';
    }
}

function setModeVariable(button) {
    // Update the current mode on click.
    
    const buttonText = button.innerText;

    // GLobal
    mode = buttonText;
}

function resetButtons() {
    // Refresh buttons back to original aesthetic on click.

    const buttons = document.querySelectorAll('button');

    buttons.forEach(button => {
        button.style.backgroundColor = 'white';
        button.style.color = '#3c3c41';
    })
}

function updateButton(button) {
    // Update the aesthetic of a button on click.

    button.style.backgroundColor = '#3c3c41';
    button.style.color = 'white';
}

function setGameMode(e) {
    // Change to the correct drawing mode and reflect the change visually through the buttons.

    const button = e.target;
    const clearButton = document.querySelector('.clear-btn');

    if (button.innerText != clearButton.innerText) {
        setModeVariable(button);
        resetButtons();
        updateButton(button);
    } else {
        clear();
    }
}

function main() {
    // Declare constants.
    const slider = document.querySelector('.slider');
    const regularBtn = document.querySelector(".regular-btn");
    const sketchContainer = document.querySelector('.sketch-container');
    const buttons = document.querySelectorAll('button');
   
    // Load page with "pixels" in the Etch-a-Sketch.
    populateSketchContainer(slider.value);

    // Load page with 'Regular Mode' button pressed.
    regularBtn.style.backgroundColor = '#3c3c41';
    regularBtn.style.color = 'white';

    // Update the gradient, slider label, and number of pixels in the etch-a-sketch, on slider input.
    slider.addEventListener('input', adjustSliderGradient);
    slider.addEventListener('input', adjustSliderText);
    slider.addEventListener('input', populateSketchContainer);

    // Update drawing mode and button aesthetic on various inputs.
    buttons.forEach(button => {
        button.addEventListener('click', setGameMode);
        button.addEventListener('mouseover', emphasizeButton);
        button.addEventListener('mouseout', deEmphasizeButton);
    });

    // Start drawing on left click.
    sketchContainer.addEventListener('mousedown', startDrawing);
    // Stop drawing on left click-release.
    sketchContainer.addEventListener('mouseup', stopDrawing);
}

// ------------------------------------------- Program Entry -------------------------------------------

main();

