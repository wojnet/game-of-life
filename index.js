const App = document.querySelector("#App");
const controls = document.querySelector("#controls"); 

const cols = 45;
const rows = 45;
var generation = 0;

const create2DArray = (cols, rows) => {
    let array = new Array(cols);
    for (let i = 0; i < array.length; i++) {
        array[i] = new Array(rows);
    }
    return array;
}

const createTable = (cols, rows) => {

    for (let i = 0; i < cols; i++) {

        let columnElement = document.createElement("div");
        columnElement.classList.add("cols");
        
        for (let i = 0; i < rows; i++) {
            let cellElement = document.createElement("div");
            cellElement.classList.add("cells");
            columnElement.appendChild(cellElement);
        }

        App.appendChild(columnElement);
    }
}

const getTable = () => {
    return Array.from(document.querySelectorAll(".cols")).map(e => Array.from(e.childNodes));
}

const draw = (gridArray, table) => {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            table[i][j].style.background = gridArray[i][j] === 0 ? "none" : "black";
        }
    }
}

const drawGeneration = (generation) => {
    document.querySelector("#generations").innerText = `GENERATION ${generation}`;
}

const randomGridArray = () => {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            gridArray[i][j] = Math.floor(Math.random() * 2);
        }
    }
}

const nextGeneration = (gridArray, nextGenGridArray) => {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let neighbours = new Array();
            if (i > 0) neighbours.push(gridArray[i-1][j]); //LEWY SĄSIAD
            if (i < cols-1) neighbours.push(gridArray[i+1][j]); //PRAWY SĄSIAD
            if (j > 0) neighbours.push(gridArray[i][j-1]); //GÓRNY SĄSIAD
            if (j < rows-1) neighbours.push(gridArray[i][j+1]); //DOLNY SĄSIAD
            if (i > 0 && j > 0) neighbours.push(gridArray[i-1][j-1]); //LEWY GÓRNY SĄSIAD
            if (i < cols-1 && j > 0) neighbours.push(gridArray[i+1][j-1]); //PRAWY GÓRNY SĄSIAD
            if (i > 0 && j < rows-1) neighbours.push(gridArray[i-1][j+1]); //LEWY DOLNY SĄSIAD
            if (i < cols-1 && j < rows-1) neighbours.push(gridArray[i+1][j+1]); //PRAWY DOLNY SĄSIAD
            
            // if (i === 1 && j === 1) console.log(neighbours.filter(e => e === 1).length);

            //!SPRAWDZENIE CO SIE STANIE Z KOMÓRKĄ:

            if (gridArray[i][j] === 0) {
                //* 1. JEŻELI JEST MARTWA KOMÓRKA

                if (neighbours.filter(e => e === 1).length === 3) {
                    nextGenGridArray[i][j] = 1;
                } else nextGenGridArray[i][j] = 0;

            } else {
                //* 2. JEŻELI JEST ŻYWA KOMÓRKA

                if (neighbours.filter(e => e === 1).length === 2 || neighbours.filter(e => e === 1).length === 3) {
                    nextGenGridArray[i][j] = 1;
                } else nextGenGridArray[i][j] = 0;

            }
        }
    }
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            gridArray[i][j] = nextGenGridArray[i][j];
        }
    }
    generation++;
    drawGeneration(generation);
}

let gridArray = create2DArray(cols, rows);
let nextGenGridArray = create2DArray(cols, rows);

for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
        gridArray[i][j] = 0;
    }
}

createTable(cols, rows);
let table = getTable();

draw(gridArray, table);
drawGeneration(generation);

for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
        table[i][j].addEventListener("click", (e) => {
            if (gridArray[i][j] === 0) {
                gridArray[i][j] = 1;
                table[i][j].style.background = "black";
            } else {
                gridArray[i][j] = 0;
                table[i][j].style.background = "none";
            }

        });
    }
}

const createControls = () => {

    //CREATE CONTROLS

    const randomizeButton = document.createElement("button");
    randomizeButton.innerHTML = "Randomize";
    randomizeButton.onclick = () => {
        randomGridArray();
        draw(gridArray, table);
        generation = 0;
        drawGeneration(generation);
    };

    const playButton = document.createElement("button");
    playButton.innerHTML = "PLAY";
    playButton.disabled = 1; /* LATER */

    const stopButton = document.createElement("button");
    stopButton.innerHTML = "STOP";
    stopButton.disabled = 1; /* LATER */

    const nextGenerationButton = document.createElement("button");
    nextGenerationButton.innerHTML = "NEXT";
    nextGenerationButton.onclick = () => {
        nextGeneration(gridArray, nextGenGridArray);
        draw(gridArray, table);
    }


    //APPEND CONTROLS

    controls.appendChild(randomizeButton);
    controls.appendChild(playButton);
    controls.appendChild(stopButton);
    controls.appendChild(nextGenerationButton);
}

createControls();