const gridContainer=document.querySelector(".grid-container");
let gridSize=16;

const gridSizeValue=document.querySelector(".grid-size-value");
gridSizeValue.textContent=`${gridSize} x ${gridSize}`;

const upBtn=document.querySelector(".up");
const downBtn=document.querySelector(".down");
const resetBtn=document.querySelector(".reset-btn");

const colorPickerBtn= document.querySelector(".color-picker");
const realInput=document.getElementById("real-color-picker");
const displayBox=document.querySelector(".picked-color");

let isDrawing=false;

let selectedColor='#82a053';

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

window.addEventListener("mouseup",globalMouseUpHandler);

resetBtn.addEventListener("click",()=>{
    updateGrid(16);
    displayBox.style.backgroundColor='#82a053';
})

colorPickerBtn.addEventListener("click",()=>{
    realInput.click();
})

realInput.addEventListener("input",(e)=>{
    selectedColor=e.target.value;
    displayBox.style.backgroundColor=selectedColor;
})

function updateGridElementColor(e){
    if(e.target.classList.contains("grid-element")) e.target.style.backgroundColor=selectedColor;
}

gridContainer.addEventListener("mousedown",(e)=>{
    if(e.button===0) {
        isDrawing=true;
        updateGridElementColor(e);
    }
})

function stopDrawing(){
    isDrawing=false;
}

gridContainer.addEventListener("mouseover",(e)=>{
    if(isDrawing) updateGridElementColor(e);
})

function globalMouseUpHandler(){
    stopHoldOnArrows();
    stopDrawing();
}