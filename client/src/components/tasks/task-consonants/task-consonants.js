import { getRandomArbitrary } from '../../../screens/battlescreen/utils';
import { level } from '../../modal-dialog/game';
import { makeMagic, makeTurn } from '../../../screens/battlescreen/youTurn';
import { randomInteger, soundClickGreat, soundClickLosing, closeTask, taskNone } from '../functions-task';


export default function showTaskСonsonants(param, player1, player2) {
    document.querySelector('.task-consonants').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    let points = 0;
    const words = ['строка', 'майка', 'животное', 'декларация', 'академия', 'благоустройство', 'мороженое', 'железнодорожная', 'зоопарк', 'шоколад'];
    const numberWord = randomInteger(0, 9);
    const length = words[numberWord].length;
    let count = 0;
    const consonants = ['б', 'в', 'г', 'д', 'ж', 'з', 'й', 'к', 'л', 'м', 'н', 'п', 'р', 'с', 'т', 'ф', 'х', 'ц', 'ч', 'ш', 'щ'];

    for (let i = 0; i < length; i += 1) {
        if (consonants.indexOf(words[numberWord].charAt(i)) !== -1) {
            count += 1;
        }
    }
    document.querySelector('.consonants').innerHTML = `${words[numberWord]}`;
    function taskСonsonants() {
        if (document.querySelector('.grate-consonants')) {
            document.querySelector('.task-consonants').removeChild(document.querySelector('.grate-consonants'));
        }

        const answerForm = document.querySelector('.input-consonants').value;
        if (answerForm.length === 0) {
            alert('Вы не ввели свое значение в форму!');
        } else if (+answerForm === count) {
            const promise = new Promise((resolve) => {
                taskNone('.task-window-consonants', '.task-consonants', 'grate-consonants', '<p>Ура! Вы правильно решили - магия применилась!</p>');
                soundClickGreat();
                closeTask('.task-consonants', '.grate-consonants', '.task-window-consonants', '.input-consonants', '.button-consonants', taskСonsonants);
                points = getRandomArbitrary(10, 20);
                resolve('result');
            })
                .then(result => {
                    makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
                    makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
                });
        } else {
            const promise = new Promise((resolve) => {
                taskNone('.task-window-consonants', '.task-consonants', 'grate-consonants', '<p>Результат не верен - магия не применилась!</p><p>Теперь ходит противник.</p>');
                soundClickLosing();
                closeTask('.task-consonants', '.grate-consonants', '.task-window-consonants', '.input-consonants', '.button-consonants', taskСonsonants);
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
    document.querySelector('.button-consonants').addEventListener('click', taskСonsonants);
}
