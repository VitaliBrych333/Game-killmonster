import { level } from '../../components/modal-dialog/game';
import createWaterfall from '../../components/animations/waterfall';
import canvasLightning from '../../components/animations/lightning';
import explosion from '../../components/animations/explosion';
import health from '../../components/animations/health-animation';
import fire from '../../components/animations/fire-animation';
import fireballs from '../../components/animations/fireballs';
import { showInscriptionOpponent, endBattle, showInscriptionMy } from './utils';

export function makeMagic(n, div1, div2, div3, div4) {
    switch (n) {
    case 'task':
        createWaterfall(div1, div2);
        break;
    case 'taskTranslation':
        canvasLightning(div1, div2);
        break;
    case 'taskPicture':
        health(div3, div4);
        break;
    case 'taskAudio':
        explosion(div1, div2);
        break;
    case 'taskCompare':
        fire(div1, div2);
        break;
    case 'taskWord':
        fireballs(div1, div2);
        break;
    case 'taskСonsonants':
        health(div3, div4);
        break;
    case 'taskCount':
        createWaterfall(div1, div2);
        break;
    case 'taskFigure':
        fire(div1, div2);
        break;
    case 'taskPoem':
        canvasLightning(div1, div2);
        break;
    case 'taskSequence':
        health(div3, div4);
        break;
    case 'taskSpace':
        fire(div1, div2);
        break;
    case 'taskSyllable':
        fireballs(div1, div2);
        break;
    case 'taskTime':
        fire(div1, div2);
        break;
    case 'taskVowels':
        explosion(div1, div2);
        break;
    default:
        break;
    }
}

export function makeTurn(
    magic, points, player1, player2,
    classAboutPlayer, idPlayerLife, classAboutMonster, idMonsterLife, whoMakeTurn,
) {
    const temp = document.querySelector('.points');
    const pl1 = player1;
    const pl2 = player2;
    setTimeout(() => {
        temp.className = 'points';

        if (magic === 'taskPicture' || magic === 'taskСonsonants' || magic === 'taskSequence') {
            pl1.score += points;
            temp.innerHTML = `${whoMakeTurn} прибавил<br />к своему здоровью<br />${points} пунктов!`;
            if (pl1.score > 100 * (level + 0.25)) {
                pl1.score = Math.floor(100 * (level + 0.25));
                temp.innerHTML = `${whoMakeTurn} уже очень здоров! :) <br />Пора ходить!`;
            }
            document.querySelector(`${classAboutPlayer}`).lastChild.innerHTML = pl1.score;
            temp.className += ' appear';
            document.querySelector(`${idPlayerLife}`).style.width = `${`${pl1.score * 2.5}px`}`;
            document.querySelector(`${idPlayerLife}`).style.transition = 'width 0.7s ease-in-out';
            document.querySelector(`${idPlayerLife}`).title = pl1.score;
            setTimeout(() => {
                temp.className += ' animated fadeOutDown';
            }, 3000);
        } else {
            pl2.score -= points;

            if (pl2.score <= 0) {
                showInscriptionOpponent(
                    temp, classAboutMonster,
                    idMonsterLife, whoMakeTurn, points,
                );
                endBattle(
                    temp, pl2, classAboutPlayer,
                    idPlayerLife, classAboutMonster, idMonsterLife, level,
                );
            } else {
                showInscriptionMy(pl2, temp, classAboutMonster, idMonsterLife, whoMakeTurn, points);
            }
        }
    }, 2000);

    temp.innerHTML = '';
}
