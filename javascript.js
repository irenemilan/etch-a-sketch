const wrapper = document.getElementById("wrapper");
const canvas = document.getElementById("canvas");
const fragment = document.createDocumentFragment();
const clearAll = document.getElementById("clear-all");
const pencil = document.getElementById("normal");
const eraser = document.getElementById("eraser");
const size = document.getElementById("size");
const rainbowColor = document.getElementById("rainbow");
const gridState = document.getElementById("grid-toggle");
const pickColor = document.getElementById("pick-a-color");
const paintStyle = document.getElementById("paint-style");
let currentColor = '#000000'
let currentMode = 'normal';
let currentPaintStyle = 'hover';
let gridOn = true;
let hold = false;

function generateRandomColor(){
    return'#'+Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}

function paint(target){
    if(target.classList.contains("grid-item")){
        let color = '';
        switch(currentMode){
            case 'rainbow':
                color = generateRandomColor();
                break;
            case 'eraser':
                color = '';
                break;
            default:
                color = currentColor;
        }
        target.style.backgroundColor = color;
    }
}

function setMode(mode){
    if(currentMode != mode){
        wrapper.classList.remove(`${currentMode}-active`);
    }
    currentMode = mode;
    wrapper.classList.add(`${mode}-active`);
}