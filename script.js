const gridContainer=document.querySelector(".grid-container");
let gridSize=16;

const gridSizeValue=document.querySelector(".grid-size-value");
gridSizeValue.textContent=`${gridSize} x ${gridSize}`;

const upBtn=document.querySelector(".up");
const downBtn=document.querySelector(".down");
const resetBtn=document.querySelector(".reset-btn");

let holdTimer=null;
let holdInterval=null;

addGridElements(gridSize);

function addGridElements(gridSize){
    gridContainer.innerHTML="";
    const percentage=100/gridSize;
    for(let i=0;i<gridSize*gridSize;i++){
        const gridElement=document.createElement("div");
        gridElement.classList.add("grid-element");

        gridElement.style.width=`${percentage}%`;
        gridElement.style.height=`${percentage}%`;

        gridContainer.appendChild(gridElement);
    }
}

function updateGrid(newSize){
    if(newSize<1 || newSize>64) return;

    gridSize=newSize;
    gridSizeValue.textContent=`${gridSize} x ${gridSize}`;
    addGridElements(gridSize);
}


function startIncrementing(){
    stopHoldOnArrows();
    updateGrid(gridSize+1);

    holdTimer=setTimeout(()=>{
        holdInterval=setInterval(()=>{
            if(gridSize<64){
                updateGrid(gridSize+1);
            } else stopHoldOnArrows();
        },85)
    },250)
}


function startDecrementing(){
    stopHoldOnArrows();
    updateGrid(gridSize-1);

    holdTimer=setTimeout(()=>{
        holdInterval=setInterval(()=>{
            if(gridSize>1){
                updateGrid(gridSize-1);
            } else stopHoldOnArrows();
        },85)
    },250)

}

function stopHoldOnArrows(){
    if(holdTimer!==null){
        clearTimeout(holdTimer);
        holdTimer=null;
    }
   if(holdInterval!==null) {
    clearInterval(holdInterval);
    holdInterval=null;
   }
}


upBtn.addEventListener("mousedown",(e)=>{
    if(e.button===0) startIncrementing();
});


downBtn.addEventListener("mousedown",(e)=>{
    if(e.button===0) startDecrementing();
});

window.addEventListener("mouseup",stopHoldOnArrows);

resetBtn.addEventListener("click",()=>{
    updateGrid(16);
})