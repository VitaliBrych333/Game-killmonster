import { endTask } from '../../screens/battlescreen/utils';

export default function fireballs(div1, div2) {
    document.querySelector(`${div1}`).innerHTML = '<img src="../../components/Images/cloud.png" alt="" /><canvas id=' +
                                                                                                       `${div2}`
                                                                                                        + '></canvas>';
    document.querySelector(`${div1}`).style.display = 'block';

    const div = document.getElementById(`${div2}`);
    const ctx = div.getContext('2d');
    let width = window.innerWidth = 280;
    let height = window.innerHeight = 500;
    const dotRadius = 22;
    const dotSpeed = 6;
    const alphaSpeed = 0.015;
    const spacing = dotRadius + 5;
    const dots = [];
    const origins = [
        {
            x: (width * 0.5) - (spacing * 4),
            y: height * 0.15,
            color: '#8acc89',
            alpha: 1,
        },
        {
            x: (width * 0.5) - (spacing * 2),
            y: height * 0.15,
            color: '#2a8285',
            alpha: 1,
        },
        {
            x: width * 0.5,
            y: height * 0.15,
            color: '#68852a',
            alpha: 1,
        },
        {
            x: (width * 0.5) + (spacing * 2),
            y: height * 0.15,
            color: '#85592a',
            alpha: 1,
        },
        {
            x: (width * 0.5) + (spacing * 4),
            y: height * 0.15,
            color: '#85392a',
            alpha: 1,
        },
    ];

    function clear() {
        width = window.innerWidth;
        height = window.innerHeight;
        div.width = width;
        div.height = height;
    }

    function start() {
        clear();
        for (let i = 0; i < origins.length; i += 1) {
            dots.push({
                x: origins[i].x,
                y: origins[i].y,
                color: origins[i].color,
                alpha: origins[i].alpha,
            });
        }
        draw();
    }

    function update() {
        if (Math.random() < 0.3) {
            const temp = dots[Math.floor(Math.random() * 5)];
            dots.push({
                x: temp.x,
                y: temp.y,
                color: temp.color,
                alpha: temp.alpha,
            });
        }
        for (let i = origins.length; i < dots.length; i += 1) {
            dots[i].y += dotSpeed;
            dots[i].alpha -= alphaSpeed;
            if (dots[i].alpha < 0.01) { dots.splice(i, 1); }
        }
    }

    function draw() {
        requestAnimationFrame(draw);
        update();
        clear();
        for (const i in dots) {
            ctx.beginPath();
            ctx.globalAlpha = dots[i].alpha;
            ctx.fillStyle = dots[i].color;
            ctx.arc(dots[i].x, dots[i].y, dotRadius, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    start();

    endTask(div1, 'Hailstorm-small');
}
