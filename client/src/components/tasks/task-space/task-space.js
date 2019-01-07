import { getRandomArbitrary } from '../../../screens/battlescreen/utils';
import { level } from '../../modal-dialog/game';
import { makeMagic, makeTurn } from '../../../screens/battlescreen/youTurn';
import { randomInteger, soundClickGreat, soundClickLosing, closeTask, taskNone } from '../functions-task';

export default function showTaskSpace(param, player1, player2) {
    document.querySelector('.task-space').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    let points = 0;
    const width = randomInteger(1, 20);
    const length = randomInteger(1, 35);
    document.querySelector('.space').innerHTML = `У дедушки на даче имеется земельный участок размерами ${width} на ${length} метров. Какова площадь участка в кв.метрах?`;
    function taskSpace() {
        if (document.querySelector('.grate-space')) {
            document.querySelector('.task-space').removeChild(document.querySelector('.grate-space'));
        }

        const answerForm = document.querySelector('.input-space').value;
        if (answerForm.length === 0) {
            alert('Вы не ввели свое значение в форму!');
        } else if (+answerForm === (width * length)) {
            const promise = new Promise((resolve) => {
                taskNone('.task-window-space', '.task-space', 'grate-space', '<p>Ура! Вы правильно решили - магия применилась!</p>');
                soundClickGreat();
                closeTask('.task-space', '.grate-space', '.task-window-space', '.input-space', '.button-space', taskSpace);
                points = getRandomArbitrary(10, 20);
                resolve('result');
            })
                .then(result => {
                    makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
                    makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
                });
        } else {
            const promise = new Promise((resolve) => {
                taskNone('.task-window-space', '.task-space', 'grate-space', '<p>Результат не верен - магия не применилась!</p><p>Теперь ходит противник.</p>');
                soundClickLosing();
                closeTask('.task-space', '.grate-space', '.task-window-space', '.input-space', '.button-space', taskSpace);
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
    document.querySelector('.button-space').addEventListener('click', taskSpace);
}
