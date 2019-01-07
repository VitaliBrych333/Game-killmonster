import { getRandomArbitrary } from '../../../screens/battlescreen/utils';
import { level } from '../../modal-dialog/game';
import { makeMagic, makeTurn } from '../../../screens/battlescreen/youTurn';
import { randomInteger, soundClickGreat, soundClickLosing, closeTask, taskNone } from '../functions-task';


const myDictionary = require('../dictionary');

export default function showTaskTranslation(param, player1, player2) {
    const dictionary = myDictionary.dictionary;
    document.querySelector('.task-translation').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    const objectWord = dictionary[randomInteger(0, 39)];
    const englishWord = objectWord.name;
    const fields = Object.keys(objectWord);
    document.querySelector('.english-word-translation').innerHTML = englishWord;
    function taskTranslate() {
        if (document.querySelector('.grate-translation')) {
            document.querySelector('.task-translation').removeChild(document.querySelector('.grate-translation'));
        }
        let points = 0;
        let coincidence = 0;
        const answerForm = document.querySelector('.input-translation').value.toLowerCase();
        if (answerForm.length === 0) {
            alert('Вы не ввели свой перевод в форму!');
        } else {
            for (let i = 1; i < fields.length; i += 1) {
                if (answerForm === objectWord[Object.keys(objectWord)[i]]) {
                    const promise = new Promise((resolve) => {
                        taskNone('.task-window-translation', '.task-translation', 'grate-translation', '<p>Ура! Вы правильно решили - магия применилась!</p>');
                        soundClickGreat();
                        closeTask('.task-translation', '.grate-translation', '.task-window-translation', '.input-translation', '.button-translation', taskTranslate);
                        coincidence += 1;
                        points = getRandomArbitrary(10, 20);
                        resolve('result');
                    })
                        .then(result => {
                            makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
                            makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
                        });
                    break;
                }
            }
            if (coincidence === 0) {
                const promise = new Promise((resolve) => {
                    taskNone('.task-window-translation', '.task-translation', 'grate-translation', '<p>Результат не верен - магия не применилась!</p><p>Теперь ходит противник.</p>');
                    soundClickLosing();
                    closeTask('.task-translation', '.grate-translation', '.task-window-translation', '.input-translation', '.button-translation', taskTranslate);
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
    }
    document.querySelector('.button-translation').addEventListener('click', taskTranslate);
}
