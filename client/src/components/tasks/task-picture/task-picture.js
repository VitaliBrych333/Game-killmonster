import { getRandomArbitrary } from '../../../screens/battlescreen/utils';
import { level } from '../../modal-dialog/game';
import { makeMagic, makeTurn } from '../../../screens/battlescreen/youTurn';
import { randomInteger, soundClickGreat, soundClickLosing, closeTask, taskNone } from '../functions-task';


const myDictionary = require('../dictionary');

export default function showTaskPicture(param, player1, player2) {
    const dictionary = myDictionary.dictionary;
    document.querySelector('.task-picture').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    let points = 0;
    const objectWord = dictionary[randomInteger(0, 39)];
    const englishWord = objectWord.name;
    document.querySelector('.animal-picture').innerHTML = `<img src='../../components/Images/img-animals/${englishWord}.jpg' alt="">`;
    function taskPicture() {
        if (document.querySelector('.grate-picture')) {
            document.querySelector('.task-picture').removeChild(document.querySelector('.grate-picture'));
        }
        const answerForm = document.querySelector('.input-picture').value.toLowerCase();
        if (answerForm.length === 0) {
            alert('Вы не ввели свое название в форму!');
        } else if (answerForm === englishWord) {
            const promise = new Promise((resolve) => {
                taskNone('.task-window-picture', '.task-picture', 'grate-picture', '<p>Ура! Вы правильно решили - магия применилась!</p>');
                soundClickGreat();
                closeTask('.task-picture', '.grate-picture', '.task-window-picture', '.input-picture', '.button-picture', taskPicture);
                points = getRandomArbitrary(10, 20);
                resolve('result');
            })
                .then(result => {
                    makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
                    makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
                });
        } else {
            const promise = new Promise((resolve) => {
                taskNone('.task-window-picture', '.task-picture', 'grate-picture', '<p>Результат не верен - магия не применилась!</p><p>Теперь ходит противник.</p>');
                soundClickLosing();
                closeTask('.task-picture', '.grate-picture', '.task-window-picture', '.input-picture', '.button-picture', taskPicture);
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
    document.querySelector('.button-picture').addEventListener('click', taskPicture);
}
