
const board = document.querySelector(".board");
const startButton = document.querySelector(".btn-start")
const modal = document.querySelector(".modal")
const startGame = document.querySelector(".start-game")
const gameOver = document.querySelector(".game-over")
const restartButton = document.querySelector(".btn-game-over")

const HighScore = document.querySelector("#high-score")
const Score = document.querySelector("#score")
const Time = document.querySelector("#time")
let interval;
let Interval;
let score = 0;
let highscore = localStorage.getItem("highScore") || 0
let time = `00.00`

let minute = 0;
let second = 0;

let blockHeight = 20
let blockWidth = 20

let blocks = [];
let snake = [
    { x: 1, y: 3 }
]

let direction = "down";

let cols = Math.floor(board.clientWidth / blockWidth)
let rows = Math.floor(board.clientHeight / blockHeight)

let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }













for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {

        let block = document.createElement("div")
        block.classList.add("block")
        board.append(block)
        blocks[`${row}-${col}`] = block


    }
}

function render() {


    let head = null;
    if (direction == "left") {
        head = { x: snake[0].x, y: snake[0].y - 1 }
    }
    else if (direction == "right") {
        head = { x: snake[0].x, y: snake[0].y + 1 }
    }
    else if (direction == "down") {
        head = { x: snake[0].x + 1, y: snake[0].y }
    }
    else if (direction == "up") {
        head = { x: snake[0].x - 1, y: snake[0].y }
    }

    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
        direction = "down"
        second = 0
        minute = 0

        gameOver.parentElement.style.display = "flex";
        modal.style.filter = "blur(4px)"
        modal.style.backdropFilter = "blur(4px)"
        clearInterval(interval)
        return
    }

    blocks[`${food.x}-${food.y}`].classList.add("food")




    if (head.x == food.x && head.y == food.y) {

        blocks[`${food.x}-${food.y}`].classList.remove("food")
        food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
        blocks[`${food.x}-${food.y}`].classList.add("food")

        score = score + 10
        snake.unshift(head)

    }






    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill")
    })

    snake.unshift(head)
    snake.pop()


    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.add("fill")
    })






    Score.textContent = score
    HighScore.textContent = highscore

    if (highscore < score) {
        localStorage.setItem("highScore", score.toString())
    }

}

Interval = setInterval(() => {
    highscore = localStorage.getItem("highScore") || 0

    second++;
    if (second > 59) {
        minute++;
        second = 0
    }
    let t = `${minute}-${second}`;
    Time.textContent = t

}, 1000)



restartButton.addEventListener("click", () => {

    blocks[`${food.x}-${food.y}`].classList.remove("food")
    food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols) }
    blocks[`${food.x}-${food.y}`].classList.add("food")


    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill")
    })

    snake = [{ x: 1, y: 3 }];
    score = 0


    modal.style.filter = "none"
    modal.style.backdropFilter = "none"
    gameOver.parentElement.style.display = "none"
    interval = setInterval(() => {
        render()
    }, 300)

})



startButton.addEventListener("click", () => {

    startGame.style.display = "none"
    modal.style.filter = "none"
    modal.style.backdropFilter = "none"
    interval = setInterval(() => {
        render()
    }, 300)
})


document.addEventListener("keydown", (e) => {


    if (e.key === "ArrowUp") {
        direction = "up"
    }
    else if (e.key === "ArrowDown") {
        direction = "down"
    }
    else if (e.key === "ArrowLeft") {
        direction = "left"
    }
    else if (e.key === "ArrowRight") {
        direction = "right"
    }
})





