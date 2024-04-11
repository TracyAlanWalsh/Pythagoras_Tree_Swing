// Define the shrinkage factor
var shrink = 0.5 * Math.sqrt(2);

// Define the initial length of the first square and the stop condition
var length = 160;  // ***change this variable for overall size
var stop = 5.5;   // ***change this variable for size of smallest block

// Set the initial depth of recursion
var depth = 0;

// Define the rotation factors
let rotateFactorL = 0;
let rotateFactorR = 0;

// Animation variables
var animationSpeed = 0.008; // Adjust the speed of animation

// Get the main canvas and its 2D rendering context
var canvas = document.getElementById("myCanvas");
var drawing = canvas.getContext("2d");
setupCanvas(drawing, 450, 535, -Math.PI / 2);

// Get the upside down canvas and its 2D rendering context
var upsideDownCanvas = document.getElementById("upsideDownCanvas");
var upsideDownDrawing = upsideDownCanvas.getContext("2d");
setupCanvas(upsideDownDrawing, 563, 307, Math.PI / 2);

// Define a function to set up canvas
function setupCanvas(context, x, y, rotation) {
    context.translate(x, y);
    context.rotate(rotation);
}

// Define a function to animate the drawing
function animate() {
    // Clear the main canvas
    clearCanvas(drawing);
    drawing.save();
    // Update rotation angles for animation
    rotateFactorL += animationSpeed;
    rotateFactorR -= animationSpeed;
    // Start drawing the squares recursively on the main canvas
    recursion(length * shrink, depth, drawing);
    
    // Clear the upside down canvas
    clearCanvas(upsideDownDrawing);
    upsideDownDrawing.save();
    // Start drawing the squares recursively upside down on the upside down canvas
    upsideDownRecursion(length * shrink, depth, upsideDownDrawing);
    
    // Request animation frame
    requestAnimationFrame(animate);
    drawing.restore();
    upsideDownDrawing.restore();
}

// Define a function to clear canvas
function clearCanvas(context) {
    context.clearRect(-400, -400, 1000, 1000);
}

// Define a recursive function to draw the squares on the main canvas
function recursion(length, depth, drawing) {
    drawing.strokeStyle = "#072b22";
    // Draw the left square
    drawing.save(); // Save the current transformation state
    drawing.translate(length, 0); // Move to the starting position for the left square
    drawing.rotate((Math.PI / 4) + rotateFactorR); // Rotate by -45 degrees

    drawing.lineWidth = .5; // Set line width
    drawing.strokeRect(0, 0, length * shrink, length * shrink); // Draw the square

    // Recursively call the function for the left square
    if (length > stop) {
        recursion(shrink * length, depth + 1, drawing);
    }

    drawing.restore(); // Restore the transformation state

    // Draw the right square
    drawing.translate(length, length); // Move to the starting position for the right square
    drawing.rotate((-Math.PI / 4) + rotateFactorL); // Rotate by 45 degrees

    drawing.translate(0, -length * shrink); // Move to the correct position for drawing
    drawing.lineWidth = .5; // Set line width
    drawing.strokeRect(0, 0, length * shrink, length * shrink); // Draw the square

    // Recursively call the function for the right square
    if (length > stop) {
        recursion(shrink * length, depth + 1, drawing);
    }
}

// Define a recursive function to draw the squares upside down on the upside down canvas
function upsideDownRecursion(length, depth, drawing) {
    drawing.strokeStyle = "#072b22";
    // Draw the left square
    drawing.save(); // Save the current transformation state
    drawing.translate(length, length); // Move to the starting position for the left square
    drawing.rotate((-Math.PI / 4) + rotateFactorL); // Rotate by 45 degrees (upside down)

    drawing.translate(0, -length * shrink); // Move to the correct position for drawing
    drawing.lineWidth = .5; // Set line width
    drawing.strokeRect(0, 0, length * shrink, length * shrink); // Draw the square
    
    // Recursively call the function for the left square
    if (length > stop) {
        upsideDownRecursion(shrink * length, depth + 1, drawing);
    }

    drawing.restore(); // Restore the transformation state

    // Draw the right square
    drawing.translate(length, 0); // Move to the starting position for the right square
    drawing.rotate((Math.PI / 4) + rotateFactorR); // Rotate by -45 degrees (upside down)

    drawing.lineWidth = .5; // Set line width
    drawing.strokeRect(0, 0, length * shrink, length * shrink); // Draw the square

    // Recursively call the function for the right square
    if (length > stop) {
        upsideDownRecursion(shrink * length, depth + 1, drawing);
    }
}

// Start animation
animate();
