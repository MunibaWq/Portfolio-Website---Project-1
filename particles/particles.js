const canvas = document.getElementById('canvas1');

//set our context variable with canvas.getContext
const ctx = canvas.getContext('2d');


//set canvas width and height to the current window size 
// and declare particle array variable which we will later
//  use to store our randomised particles
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//mouse position - create custom object called mouse
//give it x & y properties and set them to null for now
let particleArray;

// get mouse position

// also we will give it radius property which will determine 
// the size of an area around the mouse in which the react to it

let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/120) * (canvas.width/120) //we want that area to scale depending on canvas size so thats the formula for it
}

//to get the current mouse position, we will create an event listener for mousemove
// this will fire everytime the user mobes the mouse
// this listener has access to the event object
window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;

    }
);

// we will create a class for particle

// we will use it to create a randomized particle object everytime we 
// call it with the "new" keyword

// a constructor is a special method for creating and initializing an object
// created with a class
// each particle will need x and y coordinates, these are different from the mouse x,y coordinates

// directionX and directionY, which will hold the value for the number of pixels
//  our particles animate each step along the x and y access
// this can be a positive or a negative number as the particles will be bouncing
// back and forth around the canvas

class Particle {
    constructor(x,y,directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size; //particle radius
        this.color = color;

    }

 // method to draw individual particles

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#BADFE7';
        ctx.fill();
        
    }


// check particle position, check mouse position, move the particle, draw the particle
    update() {
        // check of particle is still within canvas
        if(this.x > canvas.width || this.x < 0 ) {
            this.directionX = -this.directionX ;
        }
        if(this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
    

//check collision detection - mouse position / particle position

// check if the particle was within certain distance from the mouse on the x  y axis
// we want that area to be a circle, to that we take two center points of our circles
// one is the center of our partcile the other is the mouse cursor
// we check if the distance between the two centre points is less than two radii added together

        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;

        let distance = Math.sqrt(dx*dx + dy*dy);

        if (distance < mouse.radius + this.size) { //if the distance is smaller here then the particles are colliding
            if ( mouse.x < this.x && this.x < canvas.width - this.size * 15){ //in this statement we are doing additional checks to see which side the particle is coming from, so we can decide which direction we want to push it.
                this.x += 15.2;
            }
            if (mouse.x > this.x && this.x > this.size * 15) {
                this.x -= 15.8;
            }
            if ( mouse.y < this.y && this.y < canvas.height - this.size * 15){ //in this statement we are doing additional checks to see which side the particle is coming from, so we can decide which direction we want to push it.
                this.y += 25.6;
            }
            if (mouse.y > this.y && this.y > this.size * 15) {
                this.y -= 10.5;
            }
            
        }

        //move particle
        this.x += this.directionX;
        this.y += this.directionY;

        //draw particle
        this.draw();
    }
}

//create particle array

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) /9000;

    for (let i = 0; i < numberOfParticles; i++ ) {
        let size = (Math.random() * 5) + 1 ;
       
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight- size * 2) - (size * 2)) + size * 2);

        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;

        // let color = '#BADFE7';
        var color = ["#468966","#FFF0A5", "#FFB03B","#B64926", "#8E2800"];

        particlesArray.push(new Particle(x ,y, directionX, directionY, size, color));
    }

}



//animation loop
function animate () {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
    }
}

init();
animate();
