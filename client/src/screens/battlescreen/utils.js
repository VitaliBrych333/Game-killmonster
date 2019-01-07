import { Game } from '../../components/modal-dialog/game';
import {
    saveInDB,
    leaderBoard,
} from '../../screens/recordsTable/leaderBoard';

export function getRandomArbitrary(min, max) {
    return Math.round((Math.random() * (max - min)) + min);
}

export function drawLife(personId, n) {
    document.querySelector(`#${personId}`).style.width = `${`${n * 3}px`}`;
    return n;
}

export function createNode(tag, props, ...children) {
    const element = document.createElement(tag);

    Object.keys(props).forEach((key) => { element[key] = props[key]; });

    children.forEach((child) => {
        if (typeof child === 'string') {
            child = document.createTextNode(child);
        }

        element.appendChild(child);
    });

    return element;
}

export function makeSounds(path) {
    const audio = new Audio();
    audio.src = path;
    audio.autoplay = true;
}

export function endTask(div1, nameMusic) {
    setTimeout(() => {
        makeSounds(`../../components/sound/${nameMusic}.mp3`);
    }, 2000);
    setTimeout(() => {
        document.querySelector(`${div1}`).innerHTML = '';
    }, 5000);
}

export function showInscriptionOpponent(
    temp, classAboutMonster,
    idMonsterLife, whoMakeTurn, points,
) {
    document.querySelector(`${classAboutMonster}`).lastChild.innerHTML = 0;
    temp.innerHTML = `${whoMakeTurn} нанес <br />сокрушительный урон<br />в ${points} пунктов!`;
    temp.className += ' appear';
    document.querySelector(`${idMonsterLife}`).style.width = '0';
    document.querySelector(`${idMonsterLife}`).style.transition = 'width 0.7s ease-in-out';
    document.querySelector(`${idMonsterLife}`).title = 0;
    document.querySelector('.buttonMagic').innerHTML = '';
}

export function showInscriptionMy(
    pl2, temp, classAboutMonster,
    idMonsterLife, whoMakeTurn, points,
) {
    document.querySelector(`${classAboutMonster}`).lastChild.innerHTML = pl2.score;
    temp.innerHTML = `${whoMakeTurn} нанес <br />сокрушительный урон<br />в ${points} пунктов!`;
    temp.className += ' appear';
    document.querySelector(`${idMonsterLife}`).style.width = `${`${pl2.score * 2.5}px`}`;
    document.querySelector(`${idMonsterLife}`).style.transition = 'width 0.7s ease-in-out';
    document.querySelector(`${idMonsterLife}`).title = pl2.score;
    setTimeout(() => {
        temp.className += ' animated fadeOutDown';
    }, 3000);
}

export function endBattle(
    temp, pl2, classAboutPlayer,
    idPlayerLife, classAboutMonster, idMonsterLife, level,
) {
    setTimeout(() => {
        temp.className += ' animated fadeOutDown';
        if (pl2.name === 'Predator') {
            document.querySelector('.field').style.display = 'none';
            document.querySelector('.gameOver').style.display = 'block';
            const save = async () => {
                await saveInDB().saveData();
            };
            save().then(() => {
                leaderBoard();
            });
        } else {
            document.querySelector('.field').style.display = 'none';
            document.querySelector('.nextRaund .winner').innerHTML = `Ты выиграл! :)<br />Попробуй победить следующего монстра.<br /><br /> Раунд ${(level / 0.25) - 2}`;
            document.querySelector('.nextRaund').style.display = 'block';
            document.querySelector(`${idMonsterLife}`).innerHTML = '';
            document.querySelector(`${idPlayerLife}`).innerHTML = '';
            document.querySelector(`${classAboutMonster}`).lastChild.remove();
            document.querySelector(`${classAboutPlayer}`).lastChild.remove();
            document.querySelector('#player').innerHTML = '';
            document.querySelector('#monster').innerHTML = '';
            document.querySelector('.hero').remove();
            document.querySelector('.monster').remove();
            document.querySelector('.field').lastChild.remove();
            setTimeout(() => {
                document.querySelector('.nextRaund').style.display = 'none';
                document.querySelector('.field').style.display = 'grid';
                temp.innerHTML = '';
            }, 4000);
            const nextRaund = new Game();
        }
    }, 3000);
}
