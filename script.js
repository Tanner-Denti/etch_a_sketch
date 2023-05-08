// Helper function to remove the nodes inside of a div
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Slider
document.querySelector(".slider").oninput = function() {
    let value = (this.value-this.min)/(this.max-this.min)*100;
    this.style.background = 'linear-gradient(to right, #3c3c41 0%, #3c3c41 ' + value + '%, #fff ' + value + '%, white 100%)';

    value = (value > 1) ? Math.ceil(value) : 1;
    document.querySelector(".slider-label").innerText = `${value} x ${value}`;

    const sketchContainer = document.querySelector(".sketch-container");
    removeAllChildNodes(sketchContainer)

    for (let i = 0; i < value; i++)
    {
        for (let j = 0; j < value; j++) 
        {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            pixel.style.width = `${500/value}px`
            pixel.style.height = `${500/value}px`
            pixel.style.boxSizing = 'border-box'
            pixel.style.borderStyle = 'solid'
            pixel.style.border = '0.1px solid black'
            pixel.style.backgroundClip = 'white'
            
            sketchContainer.appendChild(pixel)
        }
    }
  };


