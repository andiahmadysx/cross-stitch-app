const heightInput = document.getElementById("height-input");
const widthInput = document.getElementById("width-input");
const colorInput = document.getElementById("color-input");
const createButton = document.getElementById("create-button");
const saveButton = document.getElementById("save-button");
const clearButton = document.getElementById("clear-button");
const grid = document.getElementById("grid");
const inputWrapper = document.querySelector(".input-wrapper");
const errorMessage = document.getElementById("error-message");

let currentColor;

colorInput.addEventListener("input", (e) => {
  currentColor = e.target.value;
});


const createGrid = () => {
    const height = parseInt(heightInput.value);
    const width = parseInt(widthInput.value);
    errorMessage.innerText = "";
    grid.innerHTML = "";
    
    // set error message
    if (height > 20 || width > 20) {
        errorMessage.innerText = "Height or width cannot be more than 20";
        return;
    }
    // create grid
    grid.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${height}, 1fr)`;
    
    for (let i = 0; i < width * height; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        
        // add event listener to tile
        tile.addEventListener("click", (e) => {
            e.target.style.color = currentColor;
            
            if (e.target.innerText == "") {
                e.target.innerText = "X";
            } else {
                e.target.innerText = "";
            }
        });
        grid.appendChild(tile);
  }
};

const clearGrid = () => {
    const tiles = document.querySelectorAll(".tile");
    
    tiles.forEach((elem) => {
        elem.innerText = "";
    });
};

saveButton.addEventListener('click', ()=>{
    html2canvas(grid).then((canvas) => {
        const imageURL = canvas.toDataURL();
        const downloadButton = document.createElement('a');
        downloadButton.setAttribute('href', imageURL);
        downloadButton.setAttribute("download", "image.png");
        downloadButton.click();
        downloadButton.remove();
    })
})

createButton.addEventListener("click", createGrid);
clearButton.addEventListener("click", clearGrid);
