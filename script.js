// GLOBALS
let mode = 'Regular Mode';

// ---------------------------------------------------------------------------

function removeAllChildNodes(parent) {
    // Helper function to remove the nodes inside of a div

    parent.innerHTML = '';
}

function populateSketchContainer(value) {
    // Adds the proper number of "pixels" to the etch-a-sketch.

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
            
            sketchContainer.appendChild(pixel);
        }
    }
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

    if (mode == document.querySelector('.regular-btn').innerText) {
        e.target.style.backgroundColor = '#3c3c41';
        e.target.style.opacity = '1';
    } else if (mode == document.querySelector('.brush-btn').innerText) {
        e.target.style.backgroundColor = '#3c3c41';
        e.target.style.opacity = '0.1';
    } else if (mode == document.querySelector('.color-btn').innerText) {
        e.target.style.backgroundColor = getRandomColor();
        e.target.style.opacity = '1';
    } else if (mode == document.querySelector('.eraser-btn').innerText) {
        e.target.style.backgroundColor = 'white';
        e.target.style.opacity = '1';
    } 
}

function startDrawing() {
    // Callback to enable marking on the etch-a-sketch on click

    let pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        pixel.addEventListener('mouseover', mark);
    });
}

function stopDrawing() {
    // Callback to disable marking on the etch-a-sketch on click-release

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
        pixel.style.opacity = '1';
    });
}

function emphasizeButton(e) {
    e.target.style.backgroundColor = '#3c3c41';
    e.target.style.color = 'white';
}

function deEmphasizeButton(e) {
    if (mode != e.target.innerText) {
        e.target.style.backgroundColor = 'white';
        e.target.style.color = '#3c3c41';
    }
}

function main() {
    // Make sure the page loads with "pixels" in the Etch-a-Sketch
    populateSketchContainer(document.querySelector('.slider').value)

    // Slider (REFACTOR THIS CODE)
    document.querySelector(".slider").oninput = function() {
        let value = (this.value-this.min)/(this.max-this.min)*100;
        this.style.background = 'linear-gradient(to right, #3c3c41 0%, #3c3c41 ' + value + '%, #fff ' + value + '%, white 100%)';

        value = (value > 1) ? Math.ceil(value) : 1;
        document.querySelector(".slider-label").innerText = `${value} x ${value}`;

        populateSketchContainer(value);
    };



    const regularBtn = document.querySelector(".regular-btn")
    regularBtn.style.backgroundColor = '#3c3c41';
    regularBtn.style.color = 'white';


    let buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {


                // Make sure the mode current mode is correct
                if (e.target.innerText != document.querySelector('.clear-btn').innerText) {
                    mode = e.target.innerText;
                                // Make sure all of the buttons are reset 
                    buttons.forEach(button => {
                        button.style.backgroundColor = 'white';
                        button.style.color = '#3c3c41';
                    })

                    // Change the aesthetic of the selected button
                    e.target.style.backgroundColor = '#3c3c41';
                    e.target.style.color = 'white';
                } else {
                    clear();
                }
            });
        button.addEventListener('mouseover', emphasizeButton)
        button.addEventListener('mouseout', deEmphasizeButton)
    });



    const sketchContainer = document.querySelector('.sketch-container');
    sketchContainer.addEventListener('mousedown', startDrawing);

    sketchContainer.addEventListener('mouseup', stopDrawing);
}

main();

