export function randomInteger(min, max) {
    let rand = (min - 0.5) + (Math.random() * ((max - min) + 1));
    rand = Math.round(rand);
    return rand;
}

export function soundClickGreat() {
    const audio = new Audio();
    audio.src = '../../components/sound/great.mp3';
    audio.autoplay = true;
}

export function soundClickLosing() {
    const audio = new Audio();
    audio.src = '../../components/sound/losing.mp3';
    audio.autoplay = true;
}

export function compareRandom() {
    return Math.random() - 0.5;
}

export function closeTask(task, grate, wind, inp, but, func) {
    setTimeout(() => {
        document.querySelector('.picture-count').innerHTML = '';
        document.querySelector(`${task}`).removeChild(document.querySelector(`${grate}`));
        document.querySelector(`${task}`).style.display = 'none';
        document.querySelector('.modal-dialog').style.display = 'none';
        document.querySelector(`${wind}`).style.display = 'block';
        document.querySelector(`${inp}`).value = '';
        document.querySelector(`${but}`).removeEventListener('click', func);
        document.querySelector('.field').style.display = 'grid';
    }, 2000);
}

export function taskNone(wind, task, grateTask, sign) {
    const grate = document.createElement('div');
    document.querySelector(`${wind}`).style.display = 'none';
    document.querySelector(`${task}`).appendChild(grate);
    grate.classList.add(`${grateTask}`);
    grate.innerHTML = `${sign}`;
}
