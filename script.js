// Helper function to remove the nodes inside of a div
function removeAllChildNodes(parent) {
    parent.innerHTML = '';
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

function getRandomNumber(Max) {
    return Math.floor(Math.random() * Max);
}

function getRandomColor() {
    const r = getRandomNumber(255)
    const g = getRandomNumber(255)
    const b = getRandomNumber(255)
    
    return `rgb(${r}, ${g}, ${b})`
}

function mark(e) {
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

function clear() {
    let pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        pixel.style.backgroundColor = 'white';
        pixel.style.opacity = '1';
    });
}

// Default to regular mode
let mode = 'Regular Mode';
const regularBtn = document.querySelector(".regular-btn")
regularBtn.style.backgroundColor = '#3c3c41';
regularBtn.style.color = 'white';

// const regularBtn = document.querySelector(".regular-btn");
// const brushBtn = document.querySelector(".brush-btn");
// const stickerBtn = document.querySelector(".sticker-btn");
// const eraserBtn = document.querySelector(".eraser-btn");
// const clearBtn = document.querySelector(".clear-btn");

// regularBtn.addEventListener('click', (e) => {
//     let buttons = document.querySelectorAll('button');
//     buttons.forEach(button => {
//         button.style.backgroundColor = 'white';
//     })
//     e.target.style.backgroundColor = '#3c3c41';
//     e.target.style.color = 'white';
//     mode = e.target.innerText;
// });

let buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
            // Make sure all of the buttons are reset 
            



            // Make sure the mode current mode is correct
            if (e.target.innerText != document.querySelector('.clear-btn').innerText) {
                mode = e.target.innerText;
                // Change the aesthetic of the selected button
                e.target.style.backgroundColor = '#3c3c41';
                e.target.style.color = 'white';

                buttons.forEach(button => {
                    button.style.backgroundColor = 'white';
                    button.style.color = '#3c3c41';
                });
            } else {
                clear();
            }
            


            // // Clear out all of the pixels in the etch-a-sketch
            // if (e.target.innerText !== document.querySelector('.eraser-btn').innerText) {
            //     clear(document.querySelector('.sketch-container'));
            // }
        });
});

const sketchContainer = document.querySelector('.sketch-container');
sketchContainer.addEventListener('mousedown', start);

sketchContainer.addEventListener('mouseup', stop);



// TODO pass a parameter into mark() that sets the specific type of mark to use.
// TODO clean up the code and use a main function.