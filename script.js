// Helper function to remove the nodes inside of a div
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Adds the proper number of "pixel" divs based on a value
function populateSketchContainer(value) {
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

// function mark(event) {
//     // if (mode == 'Regular Mode') {
//     //     event.target.style.backgroundColor = '#3c3c41';
//     // }
    
//     event.target.style.backgroundColor = '#3c3c41';
// }

// function startDrawing(mode) {
//     let pixels = document.querySelectorAll('.pixel');
//     pixels.forEach(pixel => {
//         pixel.addEventListener('mouseover', mark);
//     });
// }

// function stopDrawing(mode) {
//     let pixels = document.querySelectorAll('.pixel');
//     pixels.forEach(pixel => {
//         pixel.removeEventListener('mouseover', mark);
//     });
// }




// Make sure the page loads with "pixels" in the Etch-a-Sketch
populateSketchContainer(document.querySelector('.slider').value)

// Slider
document.querySelector(".slider").oninput = function() {
    let value = (this.value-this.min)/(this.max-this.min)*100;
    this.style.background = 'linear-gradient(to right, #3c3c41 0%, #3c3c41 ' + value + '%, #fff ' + value + '%, white 100%)';

    value = (value > 1) ? Math.ceil(value) : 1;
    document.querySelector(".slider-label").innerText = `${value} x ${value}`;

    populateSketchContainer(value);
};

// let mode = 'Regular Mode';
// // Allow / disallow drawing
// document.body.onmousedown = () => (startDrawing(mode));
// document.body.onmouseup = () => (stopDrawing(mode));

function mark(e) {
    if (mode == 'Regular Mode') {
        e.target.style.backgroundColor = '#3c3c41';
    } else if (mode == 'Brush Mode') {
        e.target.style.backgroundColor = '#3c3c41';
        e.target.style.opacity = '0.3';
    }
}

function start() {
    let pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        pixel.addEventListener('mouseover', mark);
    });
}

function stop () {
    let pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        pixel.removeEventListener('mouseover', mark);
    });
}

let mode = 'Brush Mode';
const sketchContainer = document.querySelector('.sketch-container');
sketchContainer.addEventListener('mousedown', start);

sketchContainer.addEventListener('mouseup', stop);



// TODO pass a parameter into mark() that sets the specific type of mark to use.
// TODO clean up the code and use a main function.