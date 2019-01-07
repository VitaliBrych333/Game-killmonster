import { endTask } from '../../screens/battlescreen/utils';

const WaterfallCanvas = function createWaterAnim(water, waterWidth, waterHeight) {
    const _this = this;
    this.water = water;
    this.ctx = water.getContext('2d');
    this.waterWidth = waterWidth;
    this.waterHeight = waterHeight;

    this.particles = [];
    this.particleRate = 6;
    this.gravity = 0.15;

    this.init = function init() {
        this.loop();
    };

    this.reset = function reset() {
        this.ctx.clearRect(0, 0, this.waterWidth, this.waterHeight);
        this.particles = [];
    };

    this.rand = function random(rMin, rMax) {
        return Math.floor(((Math.random() * (rMax - rMin + 1)) + rMin));
    };

    this.Particle = function create() {
        const newWidth = _this.rand(1, 20);
        const newHeight = _this.rand(1, 45);
        this.x = _this.rand(10 + (newWidth / 2), _this.waterWidth - 10 - (newWidth / 2));
        this.y = -newHeight;
        this.varx = 0;
        this.vary = 0;
        this.width = newWidth;
        this.height = newHeight;
        this.hue = _this.rand(200, 220);
        this.saturation = _this.rand(30, 60);
        this.lightness = _this.rand(30, 60);
    };

    this.Particle.prototype.update = function update() {
        this.varx += this.varx;
        this.vary += _this.gravity;
        this.x += this.varx;
        this.y += this.vary;
    };

    this.Particle.prototype.render = function render() {
        _this.ctx.strokeStyle = 'hsla(' + this.hue + ', ' + this.saturation + '%, ' + this.lightness + '%, .05)';
        _this.ctx.beginPath();
        _this.ctx.moveTo(this.x, this.y);
        _this.ctx.lineTo(this.x, this.y + this.height);
        _this.ctx.lineWidth = this.width / 2;
        _this.ctx.lineCap = 'round';
        _this.ctx.stroke();
    };

    this.Particle.prototype.renderBubble = function renderBubble() {
        _this.ctx.fillStyle = 'hsla(' + this.hue + ', 40%, 40%, 1)';
        _this.ctx.fillStyle = 'hsla(' + this.hue + ', ' + this.saturation + '%, ' + this.lightness + '%, .3)';
        _this.ctx.beginPath();
        _this.ctx.arc(this.x + this.width / 2, _this.waterHeight
             - 20 - _this.rand(0, 10), _this.rand(1, 8), 0, Math.PI * 2, false);
        _this.ctx.fill();
    };

    this.createParticles = function createPart() {
        let i = this.particleRate;
        while (i--) {
            this.particles.push(new this.Particle());
        }
    };

    this.removeParticles = function removePart() {
        let i = this.particleRate;
        while (i--) {
            const part = this.particles[i];
            if (part.y > _this.waterHeight - 20 - part.height) {
                part.renderBubble();
                _this.particles.splice(i, 1);
            }
        }
    };

    this.updateParticles = function updatePart() {
        let i = this.particles.length;
        while (i--) {
            const part = this.particles[i];
            part.update(i);
        }
    };

    this.renderParticles = function renderPart() {
        let i = this.particles.length;
        while (i--) {
            const part = this.particles[i];
            part.render();
        }
    };

    this.clearCanvas = function clear() {
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.fillStyle = 'rgba(255,255,255,.06)';
        this.ctx.fillRect(0, 0, this.waterWidth, this.waterHeight);
        this.ctx.globalCompositeOperation = 'lighter';
    };

    this.loop = function loop() {
        const loopIt = function looIt() {
            requestAnimationFrame(loopIt, _this.water);
            _this.clearCanvas();
            _this.createParticles();
            _this.updateParticles();
            _this.renderParticles();
            _this.removeParticles();
        };
        loopIt();
    };
};

export default function createWaterFall(div1, div2) {
    document.querySelector(`${div1}`).innerHTML = '<img src="../../components/Images/cloud.png" alt="" /><canvas id=' + `${div2}` + '></canvas>';
    document.querySelector(`${div1}`).style.display = 'block';
    const water = document.getElementById(`${div2}`);
    const waterWidth = water.width = 220;
    const waterHeight = water.height = 500;
    const waterfall = new WaterfallCanvas(water, waterWidth, waterHeight);
    waterfall.init();
    endTask(div1, 'Running_Water');
}
