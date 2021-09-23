let currentMode = "ColorMode";
let currentColor = document.getElementById("ColorSelector").value;
 
//Creates the grid inside the Container
function CreateGrid(){
    let SketchContainer = document.getElementById("Sketch");
    SketchContainer.innerHTML = '';
    var boxes_to_create = document.getElementById("myRange").value;
    document.getElementById("CurrentGrid").textContent = boxes_to_create + "X" + boxes_to_create;
    let box_dimensions = 800  / boxes_to_create;
    SketchContainer.style.width = box_dimensions * boxes_to_create + 0.5 + 'px';
    SketchContainer.style.height = box_dimensions * boxes_to_create - 0.5 + 'px';
    for(let i = 0; i < boxes_to_create ** 2;i++){
        let current_div = document.createElement('div');
        current_div.style.backgroundColor = "white";
        current_div.style.height = box_dimensions + 'px';
        current_div.style.width = box_dimensions + 'px';
        current_div.addEventListener("mouseover",()=>{
            current_div.style.backgroundColor = GetColor();
        });
        SketchContainer.appendChild(current_div);
    }
}

//Returns color based on mode
function GetColor(){
    switch(currentMode)
    {
        case "ColorMode":
            return currentColor;
        case "RainbowMode":
            let color = Math.floor(Math.random()*16777215).toString(16);
            return "#" + color; 
        case "EraserMode":
            return "white";
    }
}

function SetMode(clickedButton){
    var buttons = document.querySelectorAll('button');
    buttons.forEach(function(button){
    if(clickedButton.target.id == "Clear")
        CreateGrid()
    else
        if(button.id == clickedButton.target.id)
        {
            document.getElementById(currentMode).setAttribute('class','')
            document.getElementById(button.id).setAttribute('class','active');
            currentMode = button.id;
        }
    });
}

// Event Listeners
document.querySelectorAll('button').forEach(function(button){
    button.addEventListener('click',(event) => {
        SetMode(event);
    })
});

document.getElementById("myRange").addEventListener('change',(event)=>{
    let range_value = event.target.value;
    CreateGrid();
    document.getElementById("CurrentGrid").textContent = range_value + "X" + range_value;  
});

document.getElementById("ColorSelector").addEventListener('change',(event)=>{
   currentColor = event.target.value;
});


//Initial Creation of the grid
CreateGrid();