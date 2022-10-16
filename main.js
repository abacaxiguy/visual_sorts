const canvas = document.querySelector('canvas');

const bubble_button = document.querySelector('.bubble-btn');
const shell_button = document.querySelector('.shell-btn');
const insertion_button = document.querySelector('.insertion-btn');
const selection_button = document.querySelector('.selection-btn');
const restart_button = document.querySelector(".restart-btn");
const visual_type_button = document.querySelector(".visual-type");

let bubble, insertion, shell, selection;
let visual_type = 0; // 0 - Dots // 1 - Bars

canvas.height = window.innerHeight - window.innerHeight * 0.15;
canvas.width = window.innerWidth - window.innerWidth * 0.15;

window.addEventListener("resize", () => {
    canvas.height = window.innerHeight - window.innerHeight * 0.15;
    canvas.width = window.innerWidth - window.innerWidth * 0.15;
    
    restart();
});

const size = 100; // 100 dots
const time = 100 // 100ms

let list_of_coords = [];

const myContext = canvas.getContext('2d');
myContext.strokeStyle = "white";

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

index_axis = (index, size) => (canvas.width / size) * index + 1; // YOU ARE THE PROBLEM

check_visual_type();
restart();

function stop_all() {
    clearInterval(bubble);
    clearInterval(shell);
    clearInterval(insertion);
    clearInterval(selection);
}

function redraw(list_of_coords) {
    myContext.clearRect(0, 0, canvas.width, canvas.height);

    myContext.fillStyle = "black";

    for (axis in list_of_coords) {
        if (visual_type) myContext.fillRect(list_of_coords[axis], index_axis(axis, size), 5, 5); 
            
        else myContext.fillRect(index_axis(axis, size), 5, 5, list_of_coords[axis]);
    }
}

function restart() {
    stop_all();
    
    list_of_coords = [];

    let i = 0;

    while (i++ < size) list_of_coords.push(random(0, canvas.width));
    
    redraw(list_of_coords);
}

restart_button.addEventListener('click', restart);

bubble_button.addEventListener('click', () => {
    let n = size;

    bubble = setInterval(function () {
        if (n <= 0) clearInterval(bubble);

        for (j = 1; j < n; j++) {
            if (list_of_coords[j - 1] > list_of_coords[j]) {
                temp = list_of_coords[j];
                list_of_coords[j] = list_of_coords[j - 1];
                list_of_coords[j - 1] = temp;
            }
        }

        redraw(list_of_coords);

        n--;
    }, time);
})

shell_button.addEventListener("click", () => {
    let d = Math.ceil(size / 2);

    shell = setInterval(function () {
        if (d <= 0) clearInterval(shell);

        for (j = 0; j + d <= size - 1; j++){
            if (list_of_coords[j] > list_of_coords[j + d]){
                temp = list_of_coords[j];
                list_of_coords[j] = list_of_coords[j + d];
                list_of_coords[j + d] = temp;
            }
        }

        redraw(list_of_coords);

        d--;
    }, time);
});

insertion_button.addEventListener("click", () => {
    let n = 1;
    
    insertion = setInterval(function () {
        if (n > size) clearInterval(insertion);
        
        let j = n - 1;  
        let temp = list_of_coords[n];

        while (j >= 0 && list_of_coords[j] > temp) {
            list_of_coords[j + 1] = list_of_coords[j];
            j--;
        }

        list_of_coords[j + 1] = temp;

        redraw(list_of_coords);

        n++;
    }, time);
});

selection_button.addEventListener("click", () => {
    let n = 0;
    let min, indice = 0;

    selection = setInterval(function () {
        if (n >= size) clearInterval(selection);

        min = list_of_coords[n];
        indice = n;

        for (j = n; j < size; j++) {
            if (list_of_coords[j] <= min) {
                min = list_of_coords[j];
                indice = j;
            }
        }

        temp = list_of_coords[n];
        list_of_coords[n] = list_of_coords[indice];
        list_of_coords[indice] = temp;

        redraw(list_of_coords);

        n++;
    }, time);
});

function check_visual_type() {
    if (!visual_type) {
        visual_type_button.innerText = "Bars 🔁";
        canvas.classList.remove("bars");
        visual_type = 1;
        restart();
    } else {
        visual_type_button.innerText = "Dots 🔁";
        visual_type = 0;
        canvas.classList.add("bars");
        restart();
    }
}

visual_type_button.addEventListener("click", check_visual_type);