let count = 0;
const bulletarray = [];
const invaderarray = [];
const explosionarray = [];
const keypress = {
    keya: false,
    keyd: false,
    keyspace: false,
};
const mouse = {
    x: window.innerWidth / 2 - 150,
    y: window.innerHeight - 180,
};
const audio1 = new Audio("gameover-86548.mp3");
const audio2 = new Audio("bullet.wav");
const audio3 = new Audio("invader.wav");


const canvas = document.querySelector("canvas");
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
const ct = canvas.getContext("2d");
window.addEventListener("keydown", (e) => {
    // console.log(e.key);
    switch (e.key) {
        case "ArrowLeft":
            window.add
            keypress.keya = true;
            break;
        case "ArrowRight":
            keypress.keyd = true;
            break;
        case " ":
            bulletarray.push(
                new bullets(player.x + 100, player.y, 10, 10, 10, "red")
            );
            audio2.play();
            break;
    }
});

window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            keypress.keya = false;
            break;
        case "ArrowRight":
            keypress.keyd = false;
            break;
        case " ":
            keypress.keyspace = false;
            break;
    }
});

// Function for bullets releasing
function bullets(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.draw = function () {
        ct.beginPath();
        ct.strokeStyle = "white";
        ct.fillStyle = this.color;
        ct.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        ct.fill();
        ct.stroke();
    };
    this.update = function () {
        this.y -= this.dy;
        // this.x -= this.dx;
    };
}

function Explosion(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.alpha = 1;

    this.draw = function () {
        ct.save();
        ct.globalAlpha = this.alpha;
        // ct.opacity = 1;
        ct.beginPath();
        ct.fillStyle = "yellow";
        ct.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ct.closePath();
        ct.fill();
        ct.restore();
    };

    this.update = function () {
        this.x += this.dx;
        this.y += this.dy;
        if (this.alpha > 0.01) {
            this.alpha -= 0.01; // Decrease alpha value for fading effect
        }
    };
}

// Function for invaders controlling
function Invader(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    const image = new Image();
    image.src = "invaders.png";

    this.draw = function () {
        ct.drawImage(image, this.x, this.y, 80, 80);
    };
    this.update = function () {
        this.y += this.velocity;
        if (this.y > window.innerHeight) {
            this.y = -80;
        }
    };
}
// Function for player controlling
function Player() {
    this.x = window.innerWidth / 2 - 150;
    this.y = window.innerHeight - 180;
    this.velocity = 18;
    const image = new Image();
    image.src = "spaceship.png";

    this.draw = function () {
        ct.drawImage(image, this.x, this.y, 200, 180);
    };
    this.update = function () {
        if (keypress.keya && this.x > 0) {
            this.x -= this.velocity; // Move left
            // console.log(this.x);
        }
        if (keypress.keyd && this.x + 200 < window.innerWidth) {
            this.x += this.velocity; // Move right
            // console.log(this.x);
        }
    };
}

const player = new Player();
let invaderTimer = null;
const maxInvaders = 3;
// console.log("Max" + maxInvaders);
function startInvaderTimer() {
    let invaderSpawnInterval = 1000;
    let randomVelocity = 5;
    invaderTimer = setInterval(() => {
        if (invaderarray.length < maxInvaders) {
            const randomX = Math.random() * (window.innerWidth - 150) + 75;
            // const randomY = Math.random() * (window.innerHeight - 150) + 75;

            invaderarray.push(new Invader(randomX, -60, randomVelocity));
            randomVelocity += 0.8;
        }
        if (invaderSpawnInterval > 300) {
            invaderSpawnInterval -= 50;
        }
    }, invaderSpawnInterval);
}
var Highscorebtn = document.createElement("button");
Highscorebtn.textContent = "HighScore";
Highscorebtn.style.position = "absolute";
Highscorebtn.style.color = "white";
Highscorebtn.style.backgroundColor = "orange";
Highscorebtn.style.left = "91%";
Highscorebtn.style.transform = "translateX(-50%)";
Highscorebtn.style.top = "5%";
Highscorebtn.style.fontSize = "25px";
Highscorebtn.style.height = "07%";
Highscorebtn.style.width = "15%";
document.body.appendChild(Highscorebtn);
// Highscore.innerHTML = localStorage.getItem("highscore");
var Scorebtn = document.createElement("button");
Scorebtn.textContent = "Score";
Scorebtn.style.position = "absolute";
Scorebtn.style.color = "white";
Scorebtn.style.backgroundColor = "orange";
Scorebtn.style.left = "91%";
Scorebtn.style.transform = "translateX(-50%)";
Scorebtn.style.top = "12%";
Scorebtn.style.fontSize = "23px";
Scorebtn.style.height = "07%";
Scorebtn.style.width = "15%";
document.body.appendChild(Scorebtn);

var restartbtn = document.createElement("button");
restartbtn.textContent = "Restart";
restartbtn.style.position = "absolute";
restartbtn.style.color = "white";
restartbtn.style.backgroundColor = "orange";
restartbtn.style.left = "48%";
restartbtn.style.transform = "translateX(-50%)";
restartbtn.style.top = "60%";
restartbtn.style.fontSize = "20px";
restartbtn.style.height = "07%";
restartbtn.style.width = "15%";

// Function to restart the game
function restartGame() {
    if (gameOver === false) {
        return;
    } else {
        clearInterval(invaderTimer); // Clear the invader timer
        invaderarray.length = 0; // Clear the invader array
        bulletarray.length = 0; // Clear the bullet array
        explosionarray.length = 0; // Clear the explosion array
        player.x = window.innerWidth / 2 - 150; // Reset player's X position
        player.y = window.innerHeight - 180; // Reset player's Y position
        count = 0; // Reset count
        Scorebtn.innerHTML = 0;
        gameOver = false;
        restartbtn.style.opacity = 0;
        startInvaderTimer();
        animate();
    }
}

restartbtn.addEventListener("click", () => {
    restartGame();
});

let gameOver = false;
let animationFrameId;
let highscore = localStorage.getItem("highscore") || 0;

// Animation function for canvas
function animate() {
    if (gameOver === true) {
        return;
    }

    ct.clearRect(0, 0, canvas.width, canvas.height);
    // ct.fillStyle = "rgba(0,0,0,0.2)";
    for (let i = 0; i < explosionarray.length; i++) {
        explosionarray[i].draw();
        explosionarray[i].update();
    }

    // Check collision between player and invader
    let playerCollided = false;
    invaderarray.forEach((invader, invaderIndex) => {
        const dx = player.x - invader.x;
        const dy = player.y - invader.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 90) {
            playerCollided = true;
            for (let i = 0; i < 10; i++) {
                let dxside = Math.random() * 10 - 5;
                let dyside = Math.random() * 10 - 5;
                explosionarray.push(
                    new Explosion(player.x, player.y, dxside, dyside, 7)
                );
                audio1.play();
            }
            gameOver = true;
            clearInterval(invaderTimer);
            restartbtn.style.opacity = 1;
            document.body.appendChild(restartbtn);
        }
    });

    // Draw and update the player if not collided
    if (!playerCollided) {
        player.draw();
        player.update();
    }

    // Draw and update the invaders
    invaderarray.forEach((invader) => {
        invader.draw();
        invader.update();
    });

    // Draw and update the bullets
    bulletarray.forEach((bullet, index) => {
        bullet.draw();
        if (bullet.x + bullet.radius <= 0) {
            bulletarray.splice(index, 1);
        } else {
            bullet.update();
        }
    });

    // Collision detection between invaders and bullets
    bulletarray.forEach((bullet, bulletIndex) => {
        invaderarray.forEach((invader, invaderIndex) => {
            const dx = bullet.x - invader.x;
            const dy = bullet.y - invader.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < bullet.radius + 40) {
                bulletarray.splice(bulletIndex, 1);
                invaderarray.splice(invaderIndex, 1);
                count++;
                Scorebtn.innerHTML = count;
                if (highscore <= count) {
                    highscore = count;
                    localStorage.setItem("highscore", highscore);
                }
                if (highscore === 0) {
                    Highscorebtn.innerHTML = "HighScore";
                } else {
                    Highscorebtn.innerHTML = highscore;
                }

                // Creating an explosion at the collision point
                for (let i = 0; i < 10; i++) {
                    let dxside = Math.random() * 10 - 5;
                    let dyside = Math.random() * 10 - 5;
                    explosionarray.push(
                        new Explosion(invader.x, invader.y, dxside, dyside, 7)
                    );
                    audio3.play();
                }
            }
        });
    });

    animationFrameId = requestAnimationFrame(animate);
}

var celebrateBtn = document.createElement("button");
celebrateBtn.textContent = "Start Game";
celebrateBtn.style.position = "absolute";
celebrateBtn.style.color = "white";
celebrateBtn.style.backgroundColor = "orange";
celebrateBtn.style.left = "48%";
celebrateBtn.style.transform = "translateX(-50%)";
celebrateBtn.style.top = "60%";
celebrateBtn.style.fontSize = "20px";
celebrateBtn.style.height = "07%";
celebrateBtn.style.width = "15%";
document.body.appendChild(celebrateBtn);

celebrateBtn.addEventListener("click", function () {
    celebrateBtn.style.opacity = 0;
    startInvaderTimer();
    // animate();
});

animate();