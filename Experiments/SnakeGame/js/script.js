let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
let score = 0

//inicia a cabeça da cobra
snake[0] = {
    x: 8 * box,
    y: 8 * box,
    d: "left"
}

//inicia a calda da cobra
snake[1] = {
    x: 7 * box,
    y: 8 * box,
    d: "left"
}

let direction = "right";

let snake_parts_loaded = 0;
let apple_loaded =0;

let curve_dr_lu = new Image();
let curve_rd_ul = new Image();
let curve_dl_ru = new Image();
let curve_ur_ld = new Image();
let head_up = new Image();
let head_down = new Image();
let head_left = new Image();
let head_right = new Image();
let tail_up = new Image();
let tail_down = new Image();
let tail_left = new Image();
let tail_right = new Image();
let body_v = new Image();
let body_h = new Image();
let apple = new Image();
let bitesound = new sound("./sound/bite.mp3");
let music = new sound("./sound/chrono-music.mp3");

//Necessario para não dar erro no context.drawImage
loadImage(curve_dr_lu,  "./imgs/curve_dr_lu.png" ).then(() => { snake_parts_loaded++ });
loadImage(curve_rd_ul,  "./imgs/curve_rd_ul.png").then(() => { snake_parts_loaded++ });
loadImage(curve_dl_ru,  "./imgs/curve_dl_ru.png" ).then(() => { snake_parts_loaded++ });
loadImage(curve_ur_ld,  "./imgs/curve_ur_ld.png").then(() => { snake_parts_loaded++ });
loadImage(head_up,      "./imgs/head_up.png").then(() => { snake_parts_loaded++ });
loadImage(head_down,    "./imgs/snake-head2.jpg").then(() => { snake_parts_loaded++ });
loadImage(head_left,    "./imgs/head_left.png").then(() => { snake_parts_loaded++ });
loadImage(head_right,   "./imgs/head_right.png").then(() => { snake_parts_loaded++ });
loadImage(tail_down,    "./imgs/tail_up.png").then(() => { snake_parts_loaded++ });
loadImage(tail_up,      "./imgs/tail_down.png").then(() => { snake_parts_loaded++ });
loadImage(tail_right,   "./imgs/tail_left.png").then(() => { snake_parts_loaded++ });
loadImage(tail_left,    "./imgs/tail_right.png").then(() => { snake_parts_loaded++ });
loadImage(body_v,       "./imgs/body_v.png").then(() => { snake_parts_loaded++ });
loadImage(body_h,       "./imgs/body_h.png").then(() => { snake_parts_loaded++ });
loadImage(apple,        "./imgs/apple.png").then(() => { apple_loaded++ });


let food = {
    x: Math.floor(Math.random() * 15 + 1) * box, 
    y: Math.floor(Math.random() * 15 + 1) * box
}

function drawBackground() {
    context.fillStyle = "white";
    context.fillRect(0,0,16*box, 16*box);
}

function drawSnake() {
    for(i=0; i < snake.length; i++) {
        //checa se todas as imagens foram carregas
        if(snake_parts_loaded == 14) {
            //Se for o primeiro elemento adiciona a cabeça da cobra;
            if(i == 0) {
                context.drawImage(eval("head_" + direction), snake[i].x, snake[i].y); 
            } 
            //Se for o ultimo adiciona a calda.
            else if(i == snake.length-1 ) 
            {
                context.drawImage(eval("tail_" + snake[i-1].d), snake[i].x, snake[i].y); 
            }
            //agora os blocos que formam o corpo da cobra;
            else {
                let currentBlockDirection = snake[i].d; 
                let frontBlockDirection = snake[i-1].d;

                //Se a direção do bloco atual for igual ao do da frente então adiciona a imagem do corpo de cobra reto.
                if(currentBlockDirection == frontBlockDirection) {
                    //se a direção for < ou > adiciona o bloco horizontal
                    if(snake[i].d == "right" || snake[i].d == "left") {
                        context.drawImage(body_h, snake[i].x, snake[i].y);
                    }
                    //caso contrário adiciona o bloco na vertical.
                    else {
                        context.drawImage(body_v, snake[i].x, snake[i].y);
                    }
                }

                //Adiciona os blocos de curva caso o bloco da frente tenha uma direção diferente.
                if(currentBlockDirection != frontBlockDirection) {
                    if(currentBlockDirection == "up" && frontBlockDirection =="right")
                    context.drawImage(curve_ur_ld, snake[i].x, snake[i].y);
                    else if(currentBlockDirection == "left" && frontBlockDirection =="down")
                    context.drawImage(curve_ur_ld, snake[i].x, snake[i].y);

                    else if(currentBlockDirection == "right" && frontBlockDirection =="down")
                    context.drawImage(curve_rd_ul, snake[i].x, snake[i].y);
                    else if(currentBlockDirection == "up" && frontBlockDirection =="left")
                    context.drawImage(curve_rd_ul, snake[i].x, snake[i].y);

                    else if(currentBlockDirection == "down" && frontBlockDirection =="right")
                    context.drawImage(curve_dr_lu, snake[i].x, snake[i].y);
                    else if(currentBlockDirection == "left" && frontBlockDirection =="up")
                    context.drawImage(curve_dr_lu, snake[i].x, snake[i].y);

                    else if(currentBlockDirection == "down" && frontBlockDirection =="left")
                    context.drawImage(curve_dl_ru, snake[i].x, snake[i].y);
                    else if(currentBlockDirection == "right" && frontBlockDirection =="up")
                    context.drawImage(curve_dl_ru, snake[i].x, snake[i].y);
                }
               
            }
        }
        else {
            
            context.fillStyle = "black";
            context.fillRect(snake[i].x, snake[i].y, box, box)
        }
    }
}

function drawFood() {
    context.fillStyle = "red";
    context.drawImage(apple, food.x,  food.y);
}

//detecta caso o player tenha apertado uma tecla
document.addEventListener('keydown', update);
function update(event) {
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
    music.play();
}

function iniciarJogo() {
    if(snake[0].x > 15 * box && direction =="right") snake[0].x =0;
    if(snake[0].x < 0 && direction =="left") snake[0].x = 16*box;
    if(snake[0].y > 15 * box && direction =="down") snake[0].y =0
    if(snake[0].y < 0  && direction =="up") snake[0].y = 16*box;

    drawBackground();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        score++;
        bitesound.play();
        document.getElementById("score").innerHTML = "Score: " + score;
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y =  Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY,
        d: direction
    }

    snake.unshift(newHead);

    drawSnake();

    
    if (snake.filter(e => e.x == snakeX && e.y == snakeY).length > 1) {
        clearInterval(game);
        document.getElementById("fim-container").style.display = "flex";
        document.querySelector("main").style.filter = "blur(5px)";
        document.getElementById("message").innerHTML = "Você comeu " + score + " 🍎 maçãs";
    }
    

}

function loadImage(image, url) {
    return new Promise(resolve => {
      image.addEventListener('load', () => {
        resolve(image);
      });
      image.src = url;
    });
  }


  function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    };
    this.stop = function () {
        this.sound.pause();
    };
}

let game = setInterval(iniciarJogo, 100);

function restartGame() {
     snake = [];
     score = 0

    snake[0] = {
    x: 8 * box,
    y: 8 * box,
    d: "left"
    }

    snake[1] = {
    x: 7 * box,
    y: 8 * box,
    d: "left"
    }

    document.getElementById("fim-container").style.display = "none";
    document.querySelector("main").style.filter = "blur(0px)";
    game = setInterval(iniciarJogo, 100);
}


