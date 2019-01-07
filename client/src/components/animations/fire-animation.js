import { endTask } from '../../screens/battlescreen/utils';

export default function fire(div1, div2) {
    document.querySelector(`${div1}`).innerHTML = '<canvas id=' +
                                                               `${div2}` +
                                                               '></canvas>';
    document.querySelector(`${div1}`).style.display = 'block';

    const canvas = document.getElementById(`${div2}`);
    const ctx = canvas.getContext('2d');
    const ParticleSystem = function createSystem(opts) {
        const defaultOpts = {
            time: Date.now(),
            emissionRate: 60,
            speed: {
                x: 0,
                y: 15,
            },
            position: {
                x: canvas.width / 2,
                y: canvas.height * 0.96,
            },
            particles: [],
            generateParticle() {
                objFire.particles.push(new Particle(objFire, Date.now()));
            },
            colourGradient: new ColorAnimation(),
            sizeGradient: new Animation(),
            animateParticles() {
                const deltaTime = Date.now() - this.time;
                let i = 0;
                const part = this.particles;
                const run = part ? part.length : 0;
                const position = this.position;
                for (i = 0; i < run; ++i) {
                    part[i].render(position, deltaTime);
                }
            },
            update() {
                this.animateParticles();
            },
            init() {
                Controller.addElement(this);
                setInterval(objFire.generateParticle, 1000 / this.emissionRate);
            },
        };
        let objFire = Object.assign({}, defaultOpts, opts);
        objFire.init();
        return objFire;
    };

    let Particle = function createPart(parent, startTime, opts) {
        const defaultOpts = {
            speed: {
                x: 0,
                y: 250,
            },
            size: 50,
            lifeTime: 1,
            getSize() {
                return this.size * parent.sizeGradient
                    .getValueAtTime(this.deltaTime / this.lifeTime, true);
            },
            position: {
                x: 0,
                y: 0,
            },
            time: 0,
            deltaTime: 0,
            render() {
                this.deltaTime = (Date.now() - this.time) / 1000;
                if (this.deltaTime > this.lifeTime) {
                    return;
                }
                const size = this.getSize();
                ctx.beginPath();
                ctx.arc(this.origin.x + this.position.x, this.origin.y
                    + this.position.y - this.speed.y * this.deltaTime, size, 0, Math.PI * 2);
                ctx.fillStyle = parent.colourGradient
                    .getValueAtTime(this.deltaTime / this.lifeTime, true);
                ctx.fill();
            },
            randomize() {
                this.lifeTime *= (Math.random() * 0.4) + 0.8;
                this.position.x += (Math.random() * 40) - 20;
                this.position.y += (Math.random() * 10) - 5;
                this.speed.y += (Math.random() * 10) - 5;
            },
        };

        const objFire = Object.assign({}, defaultOpts, opts);
        objFire.time = startTime;
        objFire.parent = parent;
        objFire.origin = {
            x: parent.position.x,
            y: parent.position.y,
        };
        objFire.randomize();
        return objFire;
    };

    let Controller = {
        elements: [],
        update() {
            Controller.clearCanvas();
            for (let i = 0, run = Controller.elements.length; i < run; ++i) {
                Controller.elements[i].update();
            }
            requestAnimationFrame(Controller.update);
        },
        clearCanvas() {
            canvas.width = canvas.width;
        },
        addElement(elem) {
            Controller.elements.push(elem);
        },

    };

    let Animation = function createAnimation() {
        return {
            frames: {
                0: 0,
                1: 1,
            },
            addFrame(time, value) {
                this.frames[time] = value;
            },
            getValueAtTime(time, interpolate) {
                let prevFrame;
                let nextFrame;
                let prevFrameTime;
                const keys = [];
                let key;
                for (const j in this.frames) {
                    keys.push(parseFloat(j));
                }
                keys.sort();
                for (let i = 0, run = keys.length; i < run; ++i) {
                    key = keys[i];
                    if (time < key) {
                        nextFrame = this.frames[key];
                        break;
                    }
                    prevFrameTime = key;
                    prevFrame = this.frames[key];
                }

                if (interpolate) {
                    return prevFrame + (nextFrame - prevFrame)
                     * ((time - prevFrameTime) * 1 / (key - prevFrameTime));
                }
                return prevFrame;
            },
        };
    };

    let ColorAnimation = function color() {
        return {
            red: new Animation(),
            green: new Animation(),
            blue: new Animation(),
            alpha: new Animation(),
            addFrame(time, rgb) {
                if (typeof rgb === 'string') {
                    rgb = hexToRgb(rgb);
                }
                this.red.addFrame(time, rgb.red);
                this.green.addFrame(time, rgb.green);
                this.blue.addFrame(time, rgb.blue);
                this.alpha.addFrame(time, rgb.alpha);
            },
            getValueAtTime(time, interpolate) {
                const red = Math.round(this.red.getValueAtTime(time, interpolate)).toString(16);
                const green = Math.round(this.green.getValueAtTime(time, interpolate)).toString(16);
                const blue = Math.round(this.blue.getValueAtTime(time, interpolate)).toString(16);
                const alpha = this.alpha.getValueAtTime(time, interpolate);
                ctx.globalAlpha = alpha;
                return `#${red.length > 1 ? red : `0${red}`}${green.length > 1 ? green : `0${green}`}${blue.length > 1 ? blue : `0${blue}`}`;
            },
        };
    };

    requestAnimationFrame(Controller.update);

    canvas.width = 280;
    canvas.height = 500;
    const partSyst = new ParticleSystem();

    partSyst.colourGradient.addFrame(0, '#d5000000');
    partSyst.colourGradient.addFrame(0.25, '#ff980088');
    partSyst.colourGradient.addFrame(0.66, '#44444433');
    partSyst.colourGradient.addFrame(1, '#22222200');
    partSyst.sizeGradient.addFrame(0, 0.25);
    partSyst.sizeGradient.addFrame(0.25, 1);
    partSyst.sizeGradient.addFrame(0.66, 0.2);
    partSyst.sizeGradient.addFrame(1, 0.75);
    partSyst.generateParticle();

    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
        return result ? {
            red: parseInt(result[1], 16),
            green: parseInt(result[2], 16),
            blue: parseInt(result[3], 16),
            alpha: typeof result[4] === 'undefined' ? 1 : parseInt(result[4], 16) / 255,
        } : null;
    }

    endTask(div1, 'burning');
}
