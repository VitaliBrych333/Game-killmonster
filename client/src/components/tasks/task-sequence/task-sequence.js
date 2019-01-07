import { getRandomArbitrary } from '../../../screens/battlescreen/utils';
import { level } from '../../modal-dialog/game';
import { makeMagic, makeTurn } from '../../../screens/battlescreen/youTurn';
import { randomInteger, soundClickGreat, soundClickLosing, closeTask, taskNone } from '../functions-task';


export default function showTaskSequence(param, player1, player2) {
    document.querySelector('.task-sequence').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    let points = 0;
    let numSequence2;
    let numSequence3;
    let numSequence4;
    let numSequence5;
    let numSequence6;
    const sequence = randomInteger(1, 2);
    const numSequence1 = randomInteger(1, 10);
    if (sequence === 1) {
        numSequence2 = (numSequence1 * 2) + 1;
        numSequence3 = (numSequence2 * 2) + 1;
        numSequence4 = (numSequence3 * 2) + 1;
        numSequence5 = (numSequence4 * 2) + 1;
        numSequence6 = (numSequence5 * 2) + 1;
    } else {
        numSequence2 = (numSequence1 + 1) * 2;
        numSequence3 = (numSequence2 + 1) * 2;
        numSequence4 = (numSequence3 + 1) * 2;
        numSequence5 = (numSequence4 + 1) * 2;
        numSequence6 = (numSequence5 + 1) * 2;
    }
    document.querySelector('.number').innerHTML = `${numSequence1}, ${numSequence2}, ${numSequence3}, ${numSequence4}, ${numSequence5}, ... `;
    function taskSequence() {
        if (document.querySelector('.grate-sequence')) {
            document.querySelector('.task-sequence').removeChild(document.querySelector('.grate-sequence'));
        }

        const answerForm = document.querySelector('.input-sequence').value;
        if (answerForm.length === 0) {
            alert('Вы не ввели свое значение в форму!');
        } else if (+answerForm === numSequence6) {
            const promise = new Promise((resolve) => {
                taskNone('.task-window-sequence', '.task-sequence', 'grate-sequence', '<p>Ура! Вы правильно решили - магия применилась!</p>');
                soundClickGreat();
                closeTask('.task-sequence', '.grate-sequence', '.task-window-sequence', '.input-sequence', '.button-sequence', taskSequence);
                points = getRandomArbitrary(10, 20);
                resolve('result');
            })
                .then(result => {
                    makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
                    makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
                });
        } else {
            const promise = new Promise((resolve) => {
                taskNone('.task-window-sequence', '.task-sequence', 'grate-sequence', '<p>Результат не верен - магия не применилась!</p><p>Теперь ходит противник.</p>');
                soundClickLosing();
                closeTask('.task-sequence', '.grate-sequence', '.task-window-sequence', '.input-sequence', '.button-sequence', taskSequence);
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
    document.querySelector('.button-sequence').addEventListener('click', taskSequence);
}
