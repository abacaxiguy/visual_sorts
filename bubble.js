const canvas = document.querySelector('canvas');

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

height = window.innerHeight - 100;
width = window.innerWidth - 100;

canvas.height = height
canvas.width = width

const myContext = canvas.getContext('2d');

myContext.strokeStyle = "white";

myContext.rect(0, 0, width, height);
myContext.stroke();
myContext.fillStyle = "black";

let i = 0;
list_of_coords = []

while (i++ < 100) {
    list_of_coords.push(random(0, width))
}
console.log(height)
for (axis in list_of_coords) {
    console.log(Math.ceil((height / 100)) + axis * 6);
    myContext.fillRect(list_of_coords[axis], Math.ceil(height / 100) + axis * 6, 5, 5);
}

bubble_button = document.querySelector('.bubble-btn');

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
            myContext.fillRect(list_of_coords[axis], Math.ceil(height / 100) + axis * 6, 5, 5);
        }

        n--;
    }, 100);
})
