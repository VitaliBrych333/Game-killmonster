import { getRandomArbitrary } from '../../../screens/battlescreen/utils';
import { level } from '../../modal-dialog/game';
import { makeMagic, makeTurn } from '../../../screens/battlescreen/youTurn';
import { randomInteger, soundClickGreat, soundClickLosing, closeTask, taskNone } from '../functions-task';

export default function showTaskCompare(param, player1, player2) {
    document.querySelector('.task-compare').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    let points = 0;
    const arrayCompare = [];
    while (arrayCompare.length !== 7) {
        const result = randomInteger(10, 99);
        if (arrayCompare.indexOf(result) === -1) {
            arrayCompare.push(result);
        }
    }

    for (let i = 0; i < 7; i += 1) {
        $('#sortable-compare').append(`<li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>${arrayCompare[i]}</li>`);
    }

    $(() => {
        $('#sortable-compare').sortable();
        $('#sortable-compare').disableSelection();
    });
    function taskCompare() {
        if (document.querySelector('.grate-compare')) {
            document.querySelector('.task-compare').removeChild(document.querySelector('.grate-compare'));
        }
        const answerArray = [];
        for (let i = 0; i < 7; i += 1) {
            answerArray.push(+$('.ui-state-default')[i].innerHTML.match(/\d{2}/)[0]);
        }
        document.querySelector('#sortable-compare').innerHTML = '';
        if ((answerArray[0] < answerArray[1])
           && (answerArray[1] < answerArray[2])
           && (answerArray[2] < answerArray[3])
           && (answerArray[3] < answerArray[4])
           && (answerArray[4] < answerArray[5])
           && (answerArray[5] < answerArray[6])) {
            const promise = new Promise((resolve) => {
                taskNone('.task-window-compare', '.task-compare', 'grate-compare', '<p>Ура! Вы правильно решили - магия применилась!</p>');
                soundClickGreat();
                closeTask('.task-compare', '.grate-compare', '.task-window-compare', '.input-audio', '.button-compare', taskCompare);
                points = getRandomArbitrary(10, 20);
                resolve('result');
            })
                .then(result => {
                    makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
                    makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
                });
        } else {
            const promise = new Promise((resolve) => {
                taskNone('.task-window-compare', '.task-compare', 'grate-compare', '<p>Результат не верен - магия не применилась!</p><p>Теперь ходит противник.</p>');
                soundClickLosing();
                closeTask('.task-compare', '.grate-compare', '.task-window-compare', '.input-audio', '.button-compare', taskCompare);
                points = Math.floor(getRandomArbitrary(10, 20) * level);
                param = ['task', 'taskTranslation', 'taskPicture', 'taskAudio', 'taskCompare', 'taskWord'][getRandomArbitrary(0, 5)];
                resolve('result');
            })
                .then(result => {
                    makeMagic(param, '.player-container .magic', 'player-magic', '.monsters-container .magic', '.monsters-container .health');
                    makeTurn(param, points, player2, player1, '.aboutMonster', '#monsterLife', '.aboutPlayer', '#playerLife', 'Противник');
                });
        }
    }
    document.querySelector('.button-compare').addEventListener('click', taskCompare);
}
