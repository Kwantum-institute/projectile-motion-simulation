const canvas = document.getElementById('simulation');
const ctx = canvas.getContext('2d');

// Reduce the canvas size
canvas.width = 600; // Adjust as needed
canvas.height = 450; // Adjust as needed

class Ball {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocity_x = 5; // Initial horizontal velocity
        this.velocity_y = -10; // Initial vertical velocity
        this.acceleration = 0.3; // Gravity
    }

    update() {
        // Update the object's position
        this.velocity_y += this.acceleration;
        this.y += this.velocity_y;
        this.x += this.velocity_x;

        // Check if the ball hits the ground
        if (this.y >= canvas.height - this.radius) {
            this.y = canvas.height - this.radius; // Keep the ball above or on the ground
            this.velocity_y = -this.velocity_y * 0.8; // Bounce effect
        }
    }

    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the ground
        ctx.fillStyle = 'green';
        ctx.fillRect(0, canvas.height - 50, canvas.width, 50);

        // Draw the ball
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

const ball = new Ball(0, canvas.height - 10, 10);

function gameLoop() {
    ball.update();
    ball.draw();
    requestAnimationFrame(gameLoop);

    // Loop the animation by resetting the ball's position
    if (ball.x > canvas.width + ball.radius) {
        ball.x = -ball.radius;
        ball.velocity_y = -10; // Reset vertical velocity
    }
}

gameLoop();
