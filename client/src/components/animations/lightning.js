import { endTask } from '../../screens/battlescreen/utils';

const Lightning = function draw(levin, levinWidth, levinHeight) {
    this.init = function init() {
        this.loop();
    };

    const _this = this;
    this.levin = levin;
    this.ctx = levin.getContext('2d');
    this.levinWidth = levinWidth;
    this.levinHeight = levinHeight;
    this.mx = 0;
    this.my = 0;

    this.lightning = [];
    this.lightTimeCurrent = 0;
    this.lightTimeTotal = 50;

    this.rand = function random(rMin, rMax) {
        return Math.floor(((Math.random() * (rMax - rMin + 1)) + rMin));
    };
    this.hitTest = function test(x1, y1, w1, h1, x2, y2, w2, h2) {
        return !(x1 + w1 < x2 || x2 + w2 < x1 || y1 + h1 < y2 || y2 + h2 < y1);
    };

    this.createL = function createElem(x, y, canSpawn) {
        this.lightning.push({
            x: x,
            y: y,
            xRange: this.rand(5, 100),
            yRange: this.rand(5, 100),
            path: [{
                x: x,
                y: y,
            }],
            pathLimit: this.rand(10, 35),
            canSpawn: canSpawn,
            hasFired: false,
        });
    };

    this.updateL = function updateElem() {
        let i = this.lightning.length;
        while (i--) {
            const light = this.lightning[i];

            light.path.push({
                x: light.path[light.path.length - 1].x
                 + (this.rand(0, light.xRange) - (light.xRange / 2)),
                y: light.path[light.path.length - 1].y + (this.rand(0, light.yRange)),
            });

            if (light.path.length > light.pathLimit) {
                this.lightning.splice(i, 1);
            }
            light.hasFired = true;
        }
    };

    this.renderL = function renderL() {
        let i = this.lightning.length;
        while (i--) {
            const light = this.lightning[i];

            this.ctx.strokeStyle = 'hsla(0, 100%, 100%, ' + this.rand(10, 100) / 100 + ')';
            this.ctx.lineWidth = 25;
            if (this.rand(0, 30) === 0) {
                this.ctx.lineWidth = 20;
            }
            if (this.rand(0, 60) === 0) {
                this.ctx.lineWidth = 30;
            }
            if (this.rand(0, 90) === 0) {
                this.ctx.lineWidth = 40;
            }
            if (this.rand(0, 120) === 0) {
                this.ctx.lineWidth = 50;
            }
            if (this.rand(0, 150) === 0) {
                this.ctx.lineWidth = 60;
            }

            this.ctx.beginPath();

            const pathCount = light.path.length;
            this.ctx.moveTo(light.x, light.y);
            for (let pc = 0; pc < pathCount; pc++) {
                this.ctx.lineTo(light.path[pc].x, light.path[pc].y);

                if (light.canSpawn) {
                    if (this.rand(0, 100) === 0) {
                        light.canSpawn = false;
                        this.createL(light.path[pc].x, 0, false);
                    }
                }
            }

            if (!light.hasFired) {
                this.ctx.fillStyle = 'rgba(255, 255, 255, ' + this.rand(4, 12) / 20 + ')';
                this.ctx.fillRect(0, 0, this.levinWidth, this.levinHeight);
            }

            if (this.rand(0, 30) === 0) {
                this.ctx.fillStyle = 'rgba(255, 255, 255, ' + this.rand(1, 3) / 100 + ')';
                this.ctx.fillRect(0, 0, this.levinWidth, this.levinHeight);
            }

            this.ctx.stroke();
        }
    };

    this.lightningTimer = function timer() {
        this.lightTimeCurrent++;
        if (this.lightTimeCurrent >= this.lightTimeTotal) {
            const newX = this.rand(100, levinWidth - 100);
            const newY = this.rand(0, levinHeight / 2);
            let createCount = this.rand(1, 3);
            while (createCount--) {
                this.createL(newX, newY, true);
            }
            this.lightTimeCurrent = 0;
            this.lightTimeTotal = this.rand(30, 60); // can be 100
        }
    };

    this.clearCanvas = function clear() {
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.fillStyle = 'rgba(0,0,0,' + this.rand(1, 30) / 100 + ')';
        this.ctx.fillRect(0, 0, this.levinWidth, this.levinHeight);
        this.ctx.globalCompositeOperation = 'source-over';
    };

    this.loop = function loop() {
        const loopIt = function loopIt() {
            requestAnimationFrame(loopIt, _this.levin);
            _this.clearCanvas();
            _this.updateL();
            _this.lightningTimer();
            _this.renderL();
        };
        loopIt();
    };
};

export default function canvasLightning(div1, div2) {
    document.querySelector(`${div1}`).innerHTML = '<img src="../../components/Images/cloud.png" alt="" /><canvas id=' + `${div2}` + '></canvas>';
    document.querySelector(`${div1}`).style.display = 'block';
    const levin = document.getElementById(`${div2}`);
    const levinWidth = levin.width = window.innerWidth;
    const levinHeight = levin.height = window.innerHeight;
    const cLevin = new Lightning(levin, levinWidth, levinHeight);

    cLevin.init();
    endTask(div1, 'Thunder');
}
