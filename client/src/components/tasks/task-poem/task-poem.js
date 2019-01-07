import { getRandomArbitrary } from '../../../screens/battlescreen/utils';
import { level } from '../../modal-dialog/game';
import { makeMagic, makeTurn } from '../../../screens/battlescreen/youTurn';
import { randomInteger, soundClickGreat, soundClickLosing, closeTask, taskNone } from '../functions-task';


const myDictionary = require('./dictionary-poems');

export default function showTaskPoem(param, player1, player2) {
    document.querySelector('.task-poem').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    let points = 0;
    const poems = myDictionary.poems;
    const solutions = [7, 10, 8, 4, 8, 7, 2, 5, 3, 4];
    const numberPoem = randomInteger(0, 9);
    document.querySelector('.poem').innerHTML = `${poems[numberPoem]}`;
    function taskPoem() {
        if (document.querySelector('.grate-poem')) {
            document.querySelector('.task-poem').removeChild(document.querySelector('.grate-poem'));
        }
        const answerForm = document.querySelector('.input-poem').value;
        if (answerForm.length === 0) {
            alert('Вы не ввели свой ответ в форму!');
        } else if (+answerForm === solutions[numberPoem]) {
            const promise = new Promise((resolve) => {
                taskNone('.task-window-poem', '.task-poem', 'grate-poem', '<p>Ура! Вы правильно решили - магия применилась!</p>');
                soundClickGreat();
                closeTask('.task-poem', '.grate-poem', '.task-window-poem', '.input-poem', '.button-poem', taskPoem);
                points = getRandomArbitrary(10, 20);
                resolve('result');
            })
                .then(result => {
                    makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
                    makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
                });
        } else {
            const promise = new Promise((resolve) => {
                taskNone('.task-window-poem', '.task-poem', 'grate-poem', '<p>Результат не верен - магия не применилась!</p><p>Теперь ходит противник.</p>');
                soundClickLosing();
                closeTask('.task-poem', '.grate-poem', '.task-window-poem', '.input-poem', '.button-poem', taskPoem);
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
    document.querySelector('.button-poem').addEventListener('click', taskPoem);
}
