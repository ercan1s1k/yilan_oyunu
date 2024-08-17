        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const scoreDisplay = document.getElementById('score');
        const speedSelect = document.getElementById('speedSelect');
        const snakeColorSelect = document.getElementById('snakeColorSelect');
        const snakeHeadColorSelect = document.getElementById('snakeHeadColorSelect');
        const foodColorSelect = document.getElementById('foodColorSelect');
        const starFoodColorSelect = document.getElementById('starFoodColorSelect');

        const box = 20;
        let snake = [];
        snake[0] = { x: 9 * box, y: 10 * box };

        let food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };

        let starFood = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box,
            visible: false
        };

        let score = 0;
        let d;
        let game;
        let isPaused = false;
        let speed = 1.65; // Varsayılan hız %45 azaltıldı
        let snakeColor = "green";
        let snakeHeadColor = "darkgreen";
        let foodColor = "red";
        let starFoodColor = "gold";

        document.addEventListener('keydown', direction);
        document.getElementById('pauseBtn').addEventListener('click', togglePause);
        document.getElementById('newGameBtn').addEventListener('click', newGame);
        speedSelect.addEventListener('change', updateSettings);
        snakeColorSelect.addEventListener('change', updateSettings);
        snakeHeadColorSelect.addEventListener('change', updateSettings);
        foodColorSelect.addEventListener('change', updateSettings);
        starFoodColorSelect.addEventListener('change', updateSettings);

        function direction(event) {
            if (event.keyCode == 37 && d != "RIGHT") {
                d = "LEFT";
            } else if (event.keyCode == 38 && d != "DOWN") {
                d = "UP";
            } else if (event.keyCode == 39 && d != "LEFT") {
                d = "RIGHT";
            } else if (event.keyCode == 40 && d != "UP") {
                d = "DOWN";
            }
        }

        function collision(head, array) {
            for (let i = 0; i < array.length; i++) {
                if (head.x == array[i].x && head.y == array[i].y) {
                    return true;
                }
            }
            return false;
        }

        function draw() {
            if (!isPaused) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                for (let i = 0; i < snake.length; i++) {
                    ctx.fillStyle = (i == 0) ? snakeHeadColor : snakeColor;
                    ctx.fillRect(snake[i].x, snake[i].y, box, box);
                    ctx.strokeStyle = "#fff";
                    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
                }

                ctx.fillStyle = foodColor;
                ctx.fillRect(food.x, food.y, box, box);

                if (starFood.visible) {
                    ctx.fillStyle = starFoodColor;
                    ctx.fillRect(starFood.x, starFood.y, box, box);
                }

                let snakeX = snake[0].x;
                let snakeY = snake[0].y;

                if (d == "LEFT") snakeX -= box;
                if (d == "UP") snakeY -= box;
                if (d == "RIGHT") snakeX += box;
                if (d == "DOWN") snakeY += box;

                if (snakeX == food.x && snakeY == food.y) {
                    score += 10;
                    food = {
                        x: Math.floor(Math.random() * 19 + 1) * box,
                        y: Math.floor(Math.random() * 19 + 1) * box
                    };
                    if (Math.random() < 0.1) {
                        starFood = {
                            x: Math.floor(Math.random() * 19 + 1) * box,
                            y: Math.floor(Math.random() * 19 + 1) * box,
                            visible: true
                        };
                    }
                } else if (starFood.visible && snakeX == starFood.x && snakeY == starFood.y) {
                    score += 15;
                    starFood.visible = false;
                } else {
                    snake.pop();
                }

                let newHead = {
                    x: snakeX,
                    y: snakeY
                };

                if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
                    clearInterval(game);
                    alert("Oyun Bitti");
                }

                snake.unshift(newHead);

                scoreDisplay.textContent = "Puan: " + score;
            }
        }

        function togglePause() {
            isPaused = !isPaused;
            if (!isPaused) {
                game = setInterval(draw, 200 / speed);  // Hız ayarına göre
            } else {
                clearInterval(game);
            }
        }

        function newGame() {
            clearInterval(game);
            snake = [];
            snake[0] = { x: 9 * box, y: 10 * box };
            score = 0;
            d = null;
            isPaused = false;
            food = {
                x: Math.floor(Math.random() * 19 + 1) * box,
                y: Math.floor(Math.random() * 19 + 1) * box
            };
            starFood = {
                x: Math.floor(Math.random() * 19 + 1) * box,
                y: Math.floor(Math.random() * 19 + 1) * box,
                visible: false
            };
            game = setInterval(draw, 200 / speed); // Hız ayarına göre
        }

        function updateSettings() {
            speed = parseInt(speedSelect.value);
            snakeColor = snakeColorSelect.value;
            snakeHeadColor = snakeHeadColorSelect.value;
            foodColor = foodColorSelect.value;
            starFoodColor = starFoodColorSelect.value;

            if (!isPaused) {
                clearInterval(game);
                game = setInterval(draw, 200 / speed); // Hız ayarına göre
            }
        }

        game = setInterval(draw, 200 / speed); // Hız ayarına göre
