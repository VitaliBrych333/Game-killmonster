import { getRandomArbitrary } from '../../../screens/battlescreen/utils';
import { level } from '../../modal-dialog/game';
import { makeMagic, makeTurn } from '../../../screens/battlescreen/youTurn';
import { randomInteger, soundClickGreat, soundClickLosing, closeTask, taskNone } from '../functions-task';

export default function showTaskSyllable(param, player1, player2) {
    document.querySelector('.task-syllable').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    let points = 0;
    const words = ['строка', 'майка', 'животное', 'декларация', 'академия', 'благоустройство', 'мороженое', 'железнодорожная', 'зоопарк', 'шоколад'];
    const solutions = ['стро-ка', 'май-ка', 'жи-во-тно-е', 'де-кла-ра-ци-я', 'а-ка-де-ми-я', 'бла-го-у-строй-ство', 'мо-ро-же-но-е', 'же-ле-зно-до-ро-жна-я', 'зо-о-парк', 'шо-ко-лад'];
    const numberWord = randomInteger(0, 9);
    document.querySelector('.syllable').innerHTML = `${words[numberWord]}`;
    function taskSyllable() {
        if (document.querySelector('.grate-syllable')) {
            document.querySelector('.task-syllable').removeChild(document.querySelector('.grate-syllable'));
        }
        const answerForm = document.querySelector('.input-syllable').value.toLowerCase();
        if (answerForm.length === 0) {
            alert('Вы не ввели свое решение в форму!');
        } else if (answerForm === solutions[numberWord]) {
            const promise = new Promise((resolve) => {
                taskNone('.task-window-syllable', '.task-syllable', 'grate-syllable', '<p>Ура! Вы правильно решили - магия применилась!</p>');
                soundClickGreat();
                closeTask('.task-syllable', '.grate-syllable', '.task-window-syllable', '.input-syllable', '.button-syllable', taskSyllable);
                points = getRandomArbitrary(10, 20);
                resolve('result');
            })
                .then(result => {
                    makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
                    makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
                });
        } else {
            const promise = new Promise((resolve) => {
                taskNone('.task-window-syllable', '.task-syllable', 'grate-syllable', '<p>Результат не верен - магия не применилась!</p><p>Теперь ходит противник.</p>');
                soundClickLosing();
                closeTask('.task-syllable', '.grate-syllable', '.task-window-syllable', '.input-syllable', '.button-syllable', taskSyllable);
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
    document.querySelector('.button-syllable').addEventListener('click', taskSyllable);
}
