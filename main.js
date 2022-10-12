const canvas = document.querySelector('canvas');
const bubble_button = document.querySelector('.bubble-btn');
const shell_button = document.querySelector('.shell-btn');
const select_button = document.querySelector('.select-btn');
const restart_button = document.querySelector(".restart-btn");
const visual_type_button = document.querySelector(".visual-type");

let bubble, select, shell;
let visual_type = 0; // 0 - Dots // 1 - Bars

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

height = window.innerHeight - 100;
width = window.innerWidth - 100;

canvas.height = height
canvas.width = width

const myContext = canvas.getContext('2d');

myContext.strokeStyle = "white";

list_of_coords = [];

restart();

function restart() {
    stop_all();
    
    list_of_coords = [];

    myContext.clearRect(0, 0, window.innerWidth - 100, window.innerHeight - 100);

    myContext.rect(0, 0, width, height);
    myContext.stroke();
    myContext.fillStyle = "black";
    
    let i = 0;
    
    while (i++ < 100) {
        list_of_coords.push(random(0, width));
    }
    
    for (axis in list_of_coords) {
        if (!visual_type) myContext.fillRect(Math.ceil(height / 100) + axis * 6, 5, 5, list_of_coords[axis]);
        else myContext.fillRect(list_of_coords[axis], Math.ceil(height / 100) + axis * 6, 5, 5);
        
    }
}

function stop_all() {
    clearInterval(bubble);
    clearInterval(shell);
    clearInterval(select);
}

restart_button.addEventListener('click', restart);

bubble_button.addEventListener('click', () => {
    let n = 100;

    bubble = setInterval(function () {
        if (n <= 0) clearInterval(bubble);

        myContext.clearRect(0, 0, window.innerWidth - 100, window.innerHeight - 100);

        myContext.fillStyle = "black";

        for (j = 1; j < n; j++) {
            if (list_of_coords[j - 1] > list_of_coords[j]) {
                temp = list_of_coords[j];
                list_of_coords[j] = list_of_coords[j - 1];
                list_of_coords[j - 1] = temp;
            }
        }

        for (axis in list_of_coords) {
            if (!visual_type) myContext.fillRect(Math.ceil(height / 100) + axis * 6, 5, 5, list_of_coords[axis]);
            else myContext.fillRect(list_of_coords[axis], Math.ceil(height / 100) + axis * 6, 5, 5);
        }

        n--;
    }, 100);
})

shell_button.addEventListener("click", () => {
    let d = Math.ceil(100 / 2);

    shell = setInterval(function () {
        if (d <= 0) clearInterval(shell);

        myContext.clearRect(0, 0, window.innerWidth - 100, window.innerHeight - 100);

        myContext.fillStyle = "black";

        for (j = 0; j + d <= 100 - 1; j++){
            if (list_of_coords[j] > list_of_coords[j + d]){
                temp = list_of_coords[j];
                list_of_coords[j] = list_of_coords[j + d];
                list_of_coords[j + d] = temp;
            }
        }

        for (axis in list_of_coords) {
            if (!visual_type) myContext.fillRect(Math.ceil(height / 100) + axis * 6, 5, 5, list_of_coords[axis]);
            else myContext.fillRect(list_of_coords[axis], Math.ceil(height / 100) + axis * 6, 5, 5);
        }

        d--;
    }, 100);
});

select_button.addEventListener("click", () => {
    let n = 1;

    select = setInterval(function () {
        if (n > 100) clearInterval(select);

        myContext.clearRect(0, 0, window.innerWidth - 100, window.innerHeight - 100);

        myContext.fillStyle = "black";

        for (j = n; j > 0; j--) {
            if (list_of_coords[j] < list_of_coords[j -1]) {
                temp = list_of_coords[j];
                list_of_coords[j] = list_of_coords[j -1];
                list_of_coords[j - 1] = temp;
            }
        }

        for (axis in list_of_coords) {
            if (!visual_type) myContext.fillRect(Math.ceil(height / 100) + axis * 6, 5, 5, list_of_coords[axis]);
            else myContext.fillRect(list_of_coords[axis], Math.ceil(height / 100) + axis * 6, 5, 5);
        }

        n++;
    }, 100);
});


visual_type_button.addEventListener('click', () => {
    if (visual_type_button.innerText == "Dots 🔁") {
        visual_type_button.innerText = "Bars 🔁";
        visual_type = 1;
        restart();
    } else {
        visual_type_button.innerText = "Dots 🔁";
        visual_type = 0;
        restart();
    }
})