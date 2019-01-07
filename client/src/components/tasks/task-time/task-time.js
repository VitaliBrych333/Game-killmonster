import { getRandomArbitrary } from '../../../screens/battlescreen/utils';
import { level } from '../../modal-dialog/game';
import { makeMagic, makeTurn } from '../../../screens/battlescreen/youTurn';
import { randomInteger, soundClickGreat, soundClickLosing, closeTask, taskNone } from '../functions-task';

export default function showTaskTime(param, player1, player2) {
    document.querySelector('.task-time').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    let points = 0;
    const minute = randomInteger(1, 59);
    document.querySelector('.time').innerHTML = `Сколько секунд в ${minute} минутах?`;
    function taskTime() {
        if (document.querySelector('.grate-time')) {
            document.querySelector('.task-time').removeChild(document.querySelector('.grate-time'));
        }
        const answerForm = document.querySelector('.input-time').value;
        if (answerForm.length === 0) {
            alert('Вы не ввели свой ответ в форму!');
        } else if (+answerForm === (minute * 60)) {
            const promise = new Promise((resolve) => {
                taskNone('.task-window-time', '.task-time', 'grate-time', '<p>Ура! Вы правильно решили - магия применилась!</p>');
                soundClickGreat();
                closeTask('.task-time', '.grate-time', '.task-window-time', '.input-time', '.button-time', taskTime);
                points = getRandomArbitrary(10, 20);
                resolve('result');
            })
                .then(result => {
                    makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
                    makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
                });
        } else {
            const promise = new Promise((resolve) => {
                taskNone('.task-window-time', '.task-time', 'grate-time', '<p>Результат не верен - магия не применилась!</p><p>Теперь ходит противник.</p>');
                soundClickLosing();
                closeTask('.task-time', '.grate-time', '.task-window-time', '.input-time', '.button-time', taskTime);
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
    document.querySelector('.button-time').addEventListener('click', taskTime);
}
