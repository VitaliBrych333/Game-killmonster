import { getRandomArbitrary } from '../../../screens/battlescreen/utils';
import { level } from '../../modal-dialog/game';
import { makeMagic, makeTurn } from '../../../screens/battlescreen/youTurn';
import { randomInteger, soundClickGreat, soundClickLosing, closeTask, taskNone } from '../functions-task';


export default function showTaskFigure(param, player1, player2) {
    document.querySelector('.task-figure').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    let points = 0;
    const countAngles = [3, 4, 5, 6, 7, 8, 40];
    const numberFigure = randomInteger(0, 6);
    document.querySelector('.figure').innerHTML = `<img src='../../components/Images/img-figures/${numberFigure}.png' alt="">`;
    function taskFigure() {
        if (document.querySelector('.grate-figure')) {
            document.querySelector('.task-figure').removeChild(document.querySelector('.grate-figure'));
        }
        const answerForm = document.querySelector('.input-figure').value;
        if (answerForm.length === 0) {
            alert('Вы не ввели свое значение в форму!');
        } else if (+answerForm === countAngles[numberFigure]) {
            const promise = new Promise((resolve) => {
                taskNone('.task-window-figure', '.task-figure', 'grate-figure', '<p>Ура! Вы правильно решили - магия применилась!</p>');
                soundClickGreat();
                closeTask('.task-figure', '.grate-figure', '.task-window-figure', '.input-figure', '.button-figure', taskFigure);
                points = getRandomArbitrary(10, 20);
                resolve('result');
            })
                .then(result => {
                    makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
                    makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
                });
        } else {
            const promise = new Promise((resolve) => {
                taskNone('.task-window-figure', '.task-figure', 'grate-figure', '<p>Результат не верен - магия не применилась!</p><p>Теперь ходит противник.</p>');
                soundClickLosing();
                closeTask('.task-figure', '.grate-figure', '.task-window-figure', '.input-figure', '.button-figure', taskFigure);
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
    document.querySelector('.button-figure').addEventListener('click', taskFigure);
}
