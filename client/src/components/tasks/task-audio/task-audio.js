import { getRandomArbitrary } from '../../../screens/battlescreen/utils';
import { level } from '../../modal-dialog/game';
import { makeMagic, makeTurn } from '../../../screens/battlescreen/youTurn';
import { randomInteger, soundClickGreat, soundClickLosing, closeTask, taskNone } from '../functions-task';

const myDictionary = require('../dictionary');

export default function showTaskAudio(param, player1, player2) {
    const dictionary = myDictionary.dictionary;
    document.querySelector('.task-audio').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    let points = 0;
    const objectWord = dictionary[randomInteger(0, 39)];
    const englishWord = objectWord.name;

    function speak(message) {
        const item = new SpeechSynthesisUtterance(message);
        const voices = window.speechSynthesis.getVoices();
        item.voice = voices[6];
        window.speechSynthesis.speak(item);
    }
    document.querySelector('.audio').onclick = function sound() {
        speak(`${englishWord}`);
    };

    function taskAudio() {
        if (document.querySelector('.grate-audio')) {
            document.querySelector('.task-audio').removeChild(document.querySelector('.grate-audio'));
        }
        const answerForm = document.querySelector('.input-audio').value.toLowerCase();
        if (answerForm.length === 0) {
            alert('Вы не ввели свое слово в форму!');
        } else if (answerForm === englishWord) {
            const promise = new Promise((resolve) => {
                taskNone('.task-window-audio', '.task-audio', 'grate-audio', '<p>Ура! Вы правильно решили - магия применилась!</p>');
                soundClickGreat();
                points = getRandomArbitrary(10, 20);
                closeTask('.task-audio', '.grate-audio', '.task-window-audio', '.input-audio', '.button-audio', taskAudio);
                resolve('result');
            })
                .then(result => {
                    makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
                    makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
                });
        } else {
            const promise = new Promise((resolve) => {
                taskNone('.task-window-audio', '.task-audio', 'grate-audio', '<p>Результат не верен - магия не применилась!</p><p>Теперь ходит противник.</p>');
                soundClickLosing();
                closeTask('.task-audio', '.grate-audio', '.task-window-audio', '.input-audio', '.button-audio', taskAudio);
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
    document.querySelector('.button-audio').addEventListener('click', taskAudio);
}
