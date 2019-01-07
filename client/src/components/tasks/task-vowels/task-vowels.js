import { getRandomArbitrary } from '../../../screens/battlescreen/utils';
import { level } from '../../modal-dialog/game';
import { makeMagic, makeTurn } from '../../../screens/battlescreen/youTurn';
import { randomInteger, soundClickGreat, soundClickLosing, closeTask, taskNone } from '../functions-task';


export default function showTaskVowels(param, player1, player2) {
    document.querySelector('.task-vowels').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    let points = 0;
    const words = ['строка', 'майка', 'животное', 'декларация', 'академия', 'благоустройство', 'мороженое', 'железнодорожная', 'зоопарк', 'шоколад'];
    const numberWord = randomInteger(0, 9);
    const length = words[numberWord].length;
    let count = 0;
    const vowels = ['а', 'у', 'о', 'ы', 'и', 'э', 'я', 'ю', 'ё', 'е'];
    for (let i = 0; i < length; i += 1) {
        if (vowels.indexOf(words[numberWord].charAt(i)) !== -1) {
            count += 1;
        }
    }
    document.querySelector('.vowels').innerHTML = `${words[numberWord]}`;
    function taskVowels() {
        if (document.querySelector('.grate-vowels')) {
            document.querySelector('.task-vowels').removeChild(document.querySelector('.grate-vowels'));
        }
        const answerForm = document.querySelector('.input-vowels').value;
        if (answerForm.length === 0) {
            alert('Вы не ввели свое значение в форму!');
        } else if (+answerForm === count) {
            const promise = new Promise((resolve) => {
                taskNone('.task-window-vowels', '.task-vowels', 'grate-vowels', '<p>Ура! Вы правильно решили - магия применилась!</p>');
                soundClickGreat();
                closeTask('.task-vowels', '.grate-vowels', '.task-window-vowels', '.input-vowels', '.button-vowels', taskVowels);
                points = getRandomArbitrary(10, 20);
                resolve('result');
            })
                .then(result => {
                    makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
                    makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
                });
        } else {
            const promise = new Promise((resolve) => {
                taskNone('.task-window-vowels', '.task-vowels', 'grate-vowels', '<p>Результат не верен - магия не применилась!</p><p>Теперь ходит противник.</p>');
                soundClickLosing();
                closeTask('.task-vowels', '.grate-vowels', '.task-window-vowels', '.input-vowels', '.button-vowels', taskVowels);
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
    document.querySelector('.button-vowels').addEventListener('click', taskVowels);
}
