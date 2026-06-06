let score = 0;
const scoreDisplay = document.getElementById('score');

// Function to handle the game logic when a click happens
function incrementScore() {
    score++;
    scoreDisplay.textContent = score;
}

// Keep track of whether the button was already pressed 
// This prevents the score from breaking if someone holds the button down
let circleButtonPressed = false;

function checkGamepad() {
    // Get the list of connected gamepads
    const gamepads = navigator.getGamepads();
    
    // The Vita controller is always the first gamepad (index 0)
    const vitaController = gamepads[0];
    
    if (vitaController) {
        // Button index 1 is the "O" (Circle) button on the Vita
        const oButton = vitaController.buttons[1];
        
        if (oButton.pressed) {
            // Only trigger once per press
            if (!circleButtonPressed) {
                incrementScore();
                circleButtonPressed = true; 
            }
        } else {
            // Reset the tracker when they let go of the button
            circleButtonPressed = false;
        }
    }
    
    // Run this function continuously on every animation frame
    requestAnimationFrame(checkGamepad);
}

// Start listening for gamepads
window.addEventListener("gamepadconnected", (e) => {
    console.log("PS Vita controller detected!");
    checkGamepad();
});
