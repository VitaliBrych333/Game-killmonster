import { getRandomArbitrary } from '../../../screens/battlescreen/utils';
import { level } from '../../modal-dialog/game';
import { makeMagic, makeTurn } from '../../../screens/battlescreen/youTurn';
import { randomInteger, soundClickGreat, soundClickLosing, closeTask, taskNone, compareRandom } from '../functions-task';


const myDictionary = require('../dictionary');

export default function showTaskWord(param, player1, player2) {
    document.querySelector('.task-word').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    const dictionary = myDictionary.dictionary;
    const objectWord = dictionary[randomInteger(0, 39)];
    const englishWord = objectWord.name;
    const arrayWord = englishWord.split('');
    const length = arrayWord.length;
    const randWord = arrayWord.sort(compareRandom);
    let points = 0;

    for (let i = 0; i < length; i += 1) {
        $('#sortable').append(`<li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>${randWord[length - i - 1]}</li>`);
    }

    $(() => {
        $('#sortable').sortable();
        $('#sortable').disableSelection();
    });

    let answerWord = '';
    function taskWord() {
        if (document.querySelector('.grate-word')) {
            document.querySelector('.task-word').removeChild(document.querySelector('.grate-word'));
        }

        for (let i = 0; i < length; i += 1) {
            answerWord += $('.ui-state-default')[i].innerHTML.charAt(54);
        }
        document.querySelector('#sortable').innerHTML = '';
        if (englishWord === answerWord) {
            const promise = new Promise((resolve) => {
                taskNone('.task-window-word', '.task-word', 'grate-word', '<p>Ура! Вы правильно решили - магия применилась!</p>');
                soundClickGreat();
                closeTask('.task-word', '.grate-word', '.task-window-word', '.input-vowels', '.button-word', taskWord);
                points = getRandomArbitrary(10, 20);
                resolve('result');
            })
                .then(result => {
                    makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
                    makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
                });
        } else {
            const promise = new Promise((resolve) => {
                taskNone('.task-window-word', '.task-word', 'grate-word', '<p>Результат не верен - магия не применилась!</p><p>Теперь ходит противник.</p>');
                soundClickLosing();
                closeTask('.task-word', '.grate-word', '.task-window-word', '.input-vowels', '.button-word', taskWord);
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
    document.querySelector('.button-word').addEventListener('click', taskWord);
}
