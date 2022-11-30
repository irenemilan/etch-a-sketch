const wrapper = document.getElementById("wrapper");
const canvas = document.getElementById("canvas");
const pickColor = document.getElementById("pick-a-color");
let currentColor = '#000000'
let currentMode = 'normal';
let currentPaintStyle = 'hover';
let gridOn = true;
let transparencyActive = false;
let hold = false;

function generateRandomColor(){
    return'#'+Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}

function getColorArray(rgb){
    if(rgb === ''){
        return [255,255,255];
    }
    return rgb.slice(4,-1).split(', ');
}

function getRGBString(s){
    return `rgb(${s[0]}, ${s[1]}, ${s[2]})`;
}

function darkenColors(target){
    let colorArray = getColorArray(target.style.backgroundColor);
    for(let i = 0; i < colorArray.length; i++){
        if(colorArray[i] <= 22.5){
            colorArray[i] =  0;
        }else{colorArray[i] = Number(colorArray[i]) - 25.5;}
    }
    return getRGBString(colorArray);
}

function lightenColors(target){
    let colorArray = getColorArray(target.style.backgroundColor);
    for(let i = 0; i < colorArray.length; i++){
        if(colorArray[i] >= 229.5){
            colorArray[i] =  255;
        }else{colorArray[i] = Number(colorArray[i]) + 25.5;}
    }
    return getRGBString(colorArray);
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
            case 'darken':
                color = darkenColors(target);
                break;
            case 'lighten':
                color = lightenColors(target);
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

document.getElementById("paint-style").addEventListener('change', e=> {
    currentPaintStyle = e.target.value;
})

canvas.addEventListener('mousedown', function(e) {
    e.preventDefault();
    hold = true;
})

document.addEventListener('mouseup', function(){
    hold = false;
})

canvas.addEventListener('mouseover', e => {
    let target = e.target;
    if(currentPaintStyle === "hover"){
        paint(target);
    }
    else if(currentPaintStyle === "hold"){
        if(hold){
            paint(target);
        }
    }
})

canvas.addEventListener('click', e => {
    if(currentPaintStyle === 'click') {
        let target = e.target;
        paint(target);
    }
})

document.getElementById("normal").addEventListener('click', function() {
    setMode('normal');
})

document.getElementById("rainbow").addEventListener('click', function() {
    setMode('rainbow');
})

document.getElementById("eraser").addEventListener('click', function() {
    setMode('eraser');
})

document.getElementById("darken").addEventListener('click', function() {
    setMode('darken');
})

document.getElementById("lighten").addEventListener('click', function() {
    setMode('lighten');
})

document.getElementById("size").addEventListener('click', function() {
    document.getElementById("aoe-popup").classList.add('display-popup');
    document.getElementById('popup-text').innerText = "How many cells wide?\n(Limit 100)"
})

document.getElementById("form").addEventListener('submit', e => {
    e.preventDefault();
    let num = document.getElementById('resize').value;
    if(!/^[1-9][0-9]*$/.test(num) || num > 100){
        document.getElementById('popup-text').innerText = "Please enter a number between 1 and 100.\nHow many cells wide?";
        return;
    }
    document.getElementById("aoe-popup").classList.remove('display-popup');
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
      }
    canvas.style.gridTemplateColumns = `repeat(${num},auto)`;
    addDivs(num);
})

document.getElementById("close-popup").addEventListener('click', function() {
    document.getElementById("aoe-popup").classList.remove('display-popup');
})

document.getElementById("clear-all").addEventListener('click', function() {
    let remove = document.querySelectorAll(".grid-item");
    for(const e of remove){
        e.style.backgroundColor = '';
    }
})

document.getElementById("grid-toggle").addEventListener('change', function() {
    gridOn = !gridOn;
    canvas.classList.toggle('grid-on', gridOn);

})

document.getElementById("toggle-bg-color").addEventListener('change', function() {
    transparencyActive = !transparencyActive;
    canvas.classList.toggle('transparency-active', transparencyActive);

})

pickColor.addEventListener('change', e => {
    currentColor = e.target.value;
})

function addDivs(num){
    let fragment = document.createDocumentFragment();
    let numOfCells = num * num;
    for(let i = 1; i <= numOfCells; i++){
        let cellToBeAdded = document.createElement('div');
        cellToBeAdded.classList.add("grid-item");
        fragment.appendChild(cellToBeAdded);
    }
    canvas.appendChild(fragment);
}

pickColor.value = currentColor;
addDivs(16);
setMode('normal');