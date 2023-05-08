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

function mark(event) {
    event.target.style.backgroundColor = '#3c3c41'
}

function startDrawing() {
    let pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        pixel.addEventListener('mouseover', mark);
    });
}

function stopDrawing() {
    let pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        pixel.removeEventListener('mouseover', mark);
    });
}

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

// Allow / disallow drawing
document.body.onmousedown = () => (startDrawing());
document.body.onmouseup = () => (stopDrawing());

