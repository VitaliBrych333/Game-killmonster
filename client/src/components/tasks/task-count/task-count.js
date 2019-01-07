import { getRandomArbitrary } from '../../../screens/battlescreen/utils';
import { level } from '../../modal-dialog/game';
import { makeMagic, makeTurn } from '../../../screens/battlescreen/youTurn';
import { randomInteger, soundClickGreat, soundClickLosing, closeTask, taskNone } from '../functions-task';

export default function showTaskCount(param, player1, player2) {
    document.querySelector('.task-count').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    let points = 0;
    const countBall = randomInteger(1, 84);
    for (let i = 1; i <= countBall; i += 1) {
        const div = document.createElement('div');
        div.innerHTML = '<img src="../../components/Images/ball.png" alt="">';
        document.querySelector('.picture-count').appendChild(div);
    }
    function taskCount() {
        if (document.querySelector('.grate-count')) {
            document.querySelector('.task-count').removeChild(document.querySelector('.grate-count'));
        }

        const answerForm = document.querySelector('.input-count').value;
        if (answerForm.length === 0) {
            alert('Вы не ввели свой перевод в форму!');
        } else if (+answerForm === countBall) {
            const promise = new Promise((resolve) => {
                taskNone('.task-window-count', '.task-count', 'grate-count', '<p>Ура! Вы правильно решили - магия применилась!</p>');
                soundClickGreat();
                closeTask('.task-count', '.grate-count', '.task-window-count', '.input-count', '.button-count', taskCount);
                points = getRandomArbitrary(10, 20);
                resolve('result');
            })
                .then(result => {
                    makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
                    makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
                });
        } else {
            const promise = new Promise((resolve) => {
                taskNone('.task-window-count', '.task-count', 'grate-count', '<p>Результат не верен - магия не применилась!</p><p>Теперь ходит противник.</p>');
                soundClickLosing();
                closeTask('.task-count', '.grate-count', '.task-window-count', '.input-count', '.button-count', taskCount);
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
    document.querySelector('.button-count').addEventListener('click', taskCount);
}
