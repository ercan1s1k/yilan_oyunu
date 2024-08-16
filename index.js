 const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        const box = 20;
        let snake = [];
        snake[0] = { x: 9 * box, y: 10 * box };

        let food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };

        let score = 0;
        let d;
        let game;
        let isPaused = false;

        document.addEventListener('keydown', direction);
        document.getElementById('pauseBtn').addEventListener('click', togglePause);
        document.getElementById('newGameBtn').addEventListener('click', newGame);

        function direction(event) {
            if (event.keyCode == 37 && d != 'RIGHT') {
                d = 'LEFT';
            } else if (event.keyCode == 38 && d != 'DOWN') {
                d = 'UP';
            } else if (event.keyCode == 39 && d != 'LEFT') {
                d = 'RIGHT';
            } else if (event.keyCode == 40 && d != 'UP') {
                d = 'DOWN';
            }
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < snake.length; i++) {
                ctx.fillStyle = (i == 0) ? '#4CAF50' : '#8BC34A';
                ctx.fillRect(snake[i].x, snake[i].y, box, box);

                ctx.strokeStyle = '#388E3C';
                ctx.strokeRect(snake[i].x, snake[i].y, box, box);
            }

            ctx.fillStyle = '#FF5722';
            ctx.fillRect(food.x, food.y, box, box);

            let snakeX = snake[0].x;
            let snakeY = snake[0].y;

            if (d == 'LEFT') snakeX -= box;
            if (d == 'UP') snakeY -= box;
            if (d == 'RIGHT') snakeX += box;
            if (d == 'DOWN') snakeY += box;

            if (snakeX == food.x && snakeY == food.y) {
                score++;
                food = {
                    x: Math.floor(Math.random() * 19 + 1) * box,
                    y: Math.floor(Math.random() * 19 + 1) * box
                };
            } else {
                snake.pop();
            }

            let newHead = {
                x: snakeX,
                y: snakeY
            };

            if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
                clearInterval(game);
            }

            snake.unshift(newHead);
        }

        function collision(head, array) {
            for (let i = 0; i < array.length; i++) {
                if (head.x == array[i].x && head.y == array[i].y) {
                    return true;
                }
            }
            return false;
        }

        function togglePause() {
            if (isPaused) {
                game = setInterval(draw, 100);
                document.getElementById('pauseBtn').innerText = 'Duraklat';
            } else {
                clearInterval(game);
                document.getElementById('pauseBtn').innerText = 'Oyuna Devam Et';
            }
            isPaused = !isPaused;
        }

        function newGame() {
            clearInterval(game);
            snake = [];
            snake[0] = { x: 9 * box, y: 10 * box };
            food = {
                x: Math.floor(Math.random() * 19 + 1) * box,
                y: Math.floor(Math.random() * 19 + 1) * box
            };
            score = 0;
            d = null;
            isPaused = false;
            document.getElementById('pauseBtn').innerText = 'Duraklat';
            game = setInterval(draw, 100);
        }

        game = setInterval(draw, 100);
