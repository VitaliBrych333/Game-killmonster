import { getRandomArbitrary } from '../../../screens/battlescreen/utils';
import { level } from '../../modal-dialog/game';
import { makeMagic, makeTurn } from '../../../screens/battlescreen/youTurn';
import { randomInteger, soundClickGreat, soundClickLosing, closeTask, taskNone } from '../functions-task';

export default function showTask(param, player1, player2) {
    document.querySelector('.task').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    const arrayOperators = ['+', '-', ':', '*'];
    let points = 0;
    let argumentOne;
    let argumentTwo;
    let total;
    const numOperator = randomInteger(0, 3);
    const operator = arrayOperators[numOperator];
    if (operator === ':') {
        while ((argumentOne % argumentTwo) !== 0) {
            argumentOne = randomInteger(10, 100);
            argumentTwo = randomInteger(2, 50);
        }
    } else if (operator === '-') {
        argumentOne = randomInteger(1, 100);
        argumentTwo = randomInteger(1, argumentOne);
    } else if (operator === '*') {
        argumentOne = randomInteger(1, 10);
        argumentTwo = randomInteger(1, 10);
    } else {
        argumentOne = randomInteger(1, 100);
        argumentTwo = randomInteger(1, 100);
    }

    document.querySelector('.argument-one').innerHTML = argumentOne;
    document.querySelector('.argument-two').innerHTML = argumentTwo;
    document.querySelector('.operator').innerHTML = operator;
    switch (operator) {
    case '+':
        total = argumentOne + argumentTwo;
        break;
    case '-':
        total = argumentOne - argumentTwo;
        break;
    case ':':
        total = argumentOne / argumentTwo;
        break;
    case '*':
        total = argumentOne * argumentTwo;
        break;
    default:
        break;
    }
    function Task() {
        if (document.querySelector('.grate')) {
            document.querySelector('.task').removeChild(document.querySelector('.grate'));
        }
        const resultForm = document.querySelector('#input').value;
        if (resultForm.length === 0) {
            alert('Вы не ввели свое решение в форму!');
        } else if (+resultForm !== total) {
            const promise = new Promise((resolve) => {
                taskNone('.task-window', '.task', 'grate', '<p>Результат не верен - магия не применилась!</p><p>Теперь ходит противник.</p>');
                soundClickLosing();
                closeTask('.task', '.grate', '.task-window', '.input', '.button', Task);
                points = Math.floor(getRandomArbitrary(10, 20) * level);
                param = ['task', 'taskTranslation', 'taskPicture', 'taskAudio', 'taskCompare', 'taskWord'][getRandomArbitrary(0, 5)];
                resolve('result');
            })
                .then(result => {
                    makeMagic(param, '.player-container .magic', 'player-magic', '.monsters-container .magic', '.monsters-container .health');
                    makeTurn(param, points, player2, player1, '.aboutMonster', '#monsterLife', '.aboutPlayer', '#playerLife', 'Противник');
                });
        } else if (+resultForm === total) {
            const promise = new Promise((resolve) => {
                taskNone('.task-window', '.task', 'grate', '<p>Ура! Вы правильно решили - магия применилась!</p>');
                soundClickGreat();
                closeTask('.task', '.grate', '.task-window', '.input', '.button', Task);
                points = getRandomArbitrary(10, 20);
                resolve('result');
            })
                .then(result => {
                    makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
                    makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
                });
        }
    }
    document.querySelector('.button').addEventListener('click', Task);
}
