import { endTask } from '../../screens/battlescreen/utils';

export default function explosion(div1, div2) {
    document.querySelector(`${div1}`).innerHTML = '<canvas id=' +
                                                                `${div2}`
                                                                + '></canvas>';
    document.querySelector(`${div1}`).style.display = 'block';

    const canvas = document.getElementById(`${div2}`);
    const ctx = canvas.getContext('2d');
    const colours = ['#56d4be', '#56d464', '#bbd456', '#a585b3', '#6985e0'];
    const balls = [];

    canvas.width = 280;
    canvas.height = 500;
    canvas.style.width = `${280}px`;
    canvas.style.height = `${500}px`;

    const origin = {
        x: canvas.width / 2,
        y: canvas.height / 2,
    };
    const normal = {
        x: canvas.width / 2,
        y: canvas.height / 2,
    };

    class Ball {
        constructor(x = origin.x, y = origin.y) {
            this.x = x;
            this.y = y;
            this.angle = Math.PI * 2 * Math.random();

            this.multiplier = randBetween(3, 6);
            this.varx = (this.multiplier + (Math.random() * 0.5)) * Math.cos(this.angle);
            this.vary = (this.multiplier + (Math.random() * 0.5)) * Math.sin(this.angle);
            this.rand = randBetween(8, 12) + (3 * Math.random());
            this.color = colours[Math.floor(Math.random() * colours.length)];
            this.direction = randBetween(-1, 1);
        }

        update() {
            this.x += this.varx - normal.x;
            this.y += this.vary - normal.y;

            normal.x = (-2 / 220) * Math.sin(this.angle);
            normal.y = (-2 / 500) * Math.cos(this.angle);

            this.rand -= 0.3;
            this.varx *= 0.9;
            this.vary *= 0.9;
        }
    }

    function pushBalls(count = 1, x = origin.x, y = origin.y) {
        for (let i = 0; i < count; i += 1) {
            balls.push(new Ball(x, y));
        }
    }

    function randBetween(min, max) {
        return Math.floor(Math.random() * max) + min;
    }

    loop();
    function loop() {
        ctx.fillStyle = 'rgba(20, 24, 41, 0)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);


        for (let i = 0; i < balls.length; i += 1) {
            const ball = balls[i];

            if (ball.rand < 0) continue;

            ctx.fillStyle = ball.color;
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.rand, 0, Math.PI * 2, false);
            ctx.fill();

            ball.update();
        }
        removeBall();
        requestAnimationFrame(loop);
    }

    function removeBall() {
        for (let i = 0; i < balls.length; i += 1) {
            const ball = balls[i];
            if (
                ball.x + ball.rand < 0 ||
                ball.x - ball.rand > canvas.width ||
                ball.y + ball.rand < 0 ||
                ball.y - ball.rand > canvas.height ||
                ball.rand < 0
            ) {
                balls.splice(i, 1);
            }
        }
    }

    const timeOut = setInterval(() => {
        pushBalls(randBetween(10, 20), origin.x + randBetween(-50, 50), origin.y +
        randBetween(-50, 50));
    }, 200);
    endTask(div1, 'Thunder');
}
