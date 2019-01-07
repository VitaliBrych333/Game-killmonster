import Person from '../../screens/battlescreen/personClass';
import showTask from '../tasks/task-screen/task-screen';
import {
    getRandomArbitrary,
    drawLife,
    createNode,
} from '../../screens/battlescreen/utils';
import showTaskTranslation from '../../components/tasks/task-translate/task-translate';
import showTaskPicture from '../../components/tasks/task-picture/task-picture';
import showTaskAudio from '../../components/tasks/task-audio/task-audio';
import showTaskCompare from '../../components/tasks/task-compare/task-compare';
import showTaskСonsonants from '../../components/tasks/task-consonants/task-consonants';
import showTaskCount from '../../components/tasks/task-count/task-count';
import showTaskFigure from '../../components/tasks/task-figure/task-figure';
import showTaskPoem from '../../components/tasks/task-poem/task-poem';
import showTaskSequence from '../../components/tasks/task-sequence/task-sequence';
import showTaskSpace from '../../components/tasks/task-space/task-space';
import showTaskSyllable from '../../components/tasks/task-syllable/task-syllable';
import showTaskTime from '../../components/tasks/task-time/task-time';
import showTaskVowels from '../../components/tasks/task-vowels/task-vowels';
import showTaskWord from '../../components/tasks/task-word/task-word';
/* eslint-disable */
export let level = 0.75; 

const nameAdjectiveMonster = ['Crazy', 'Dirty', 'Bloody'];
const whichMonster = ['Orc', 'Goblin', 'Demon'];
const nameMonster = ['Abaddon', 'Camael', 'Ishim'];

export function Game() {
    level += 0.25;
    document.querySelector('#go').addEventListener('click', startGame, false);

    function startGame() {
        document.querySelector('.landing').style.display = 'none';
        document.querySelector('.gameOver').style.display = 'none';
        document.querySelector('.nextRaund').style.display = 'none';
        document.querySelector('.base-surfase').style.display = 'block';
    }

    const player = new Person('Predator', 1);

    drawLife('player', player.score);
    document.querySelector('#playerLife').style.width = `${`${player.score * 2.5}px`}`;

    const monster = new Person(String(nameAdjectiveMonster[getRandomArbitrary(0, 2)] + ' ' + whichMonster[getRandomArbitrary(0, 2)] + ' ' + nameMonster[getRandomArbitrary(0, 2)]), level);
    drawLife('monster', monster.score);
    document.querySelector('#monsterLife').style.width = `${`${monster.score * 2.5}px`}`;

    document.querySelector('#playerLife').title = player.score;
    document.querySelector('#monsterLife').title = monster.score;
    let boxScore = document.createElement('div');
    boxScore.innerHTML = player.score;
    document.querySelector('.aboutPlayer').appendChild(boxScore);

    boxScore = document.createElement('div');
    boxScore.innerHTML = monster.score;
    document.querySelector('.aboutMonster').appendChild(boxScore);

    const playerField = document.querySelector('.aboutPlayer');
    const monsterField = document.querySelector('.aboutMonster');

    playerField.firstElementChild.appendChild(createNode('span', {}, player.name));
    monsterField.firstElementChild.appendChild(createNode('span', {}, monster.name));
    monsterField.firstElementChild.style.width = '300px';
    playerField.firstElementChild.style.width = '300px';

    loadFight();
    document.querySelector('#start').addEventListener('click', () => {
        dialog();
        document.querySelector('.spell').addEventListener('click', selectMagic, false);
    }, false);

    function selectMagic(elem) {

        switch (elem.target.id) {
        case 'task':
            showTask('task', player, monster);
            break;
        case 'taskTranslation':
            showTaskTranslation('taskTranslation', player, monster);
            break;
        case 'taskPicture':
            showTaskPicture('taskPicture', player, monster);
            break;
        case 'taskAudio':
            showTaskAudio('taskAudio', player, monster);
            break;
        case 'taskCompare':
            showTaskCompare('taskCompare', player, monster);
            break;
        case 'taskWord':
            showTaskWord('taskWord', player, monster);
            break;
        case 'taskСonsonants':
            showTaskСonsonants('taskСonsonants', player, monster);
            break;
        case 'taskCount':
            showTaskCount('taskCount', player, monster);
            break;
        case 'taskFigure':
            showTaskFigure('taskFigure', player, monster);
            break;
        case 'taskPoem':
            showTaskPoem('taskPoem', player, monster);
            break;
        case 'taskSequence':
            showTaskSequence('taskSequence', player, monster);
            break;
        case 'taskSpace':
            showTaskSpace('taskSpace', player, monster);
            break;
        case 'taskSyllable':
            showTaskSyllable('taskSyllable', player, monster);
            break;
        case 'taskTime':
            showTaskTime('taskTime', player, monster);
            break;
        case 'taskVowels':
            showTaskVowels('taskVowels', player, monster);
            break;
        default:
            break;
        }

        document.querySelector('.spell').removeEventListener('click', selectMagic);
    }

    function loadFight() {
        const mainField = document.querySelector('.field');
        const mainHero = document.createElement('div');
        mainHero.className = 'hero';
        buildPerson(mainHero, 1, 1, 1);

        const modalWindow = document.createElement('div');
        modalWindow.className = 'buttonMagic';
        modalWindow.style.alignSelf = 'end';
        modalWindow.style.justifySelf = 'center';
        modalWindow.innerHTML = '<div class="modal-dialog"><p class="close" onclick="closeScore()">&#215;</p>\
<p>Выберите заклинание:</p><div class="spell">\
<img id="task" src="../../components/Images/Atack.png" alt=""><p>Магия воды</p>\
            <img id="taskTranslation" src="../../components/Images/Lightning.png" alt=""><p>Магия молнии</p>\
            <img id="taskPicture" src="../../components/Images/Health.png" alt=""><p>Лечить себя</p>\
            <img id="taskAudio" src="../../components/Images/Question.png" alt=""><p>Удар радуги</p>\
            <img id="taskCompare" src="../../components/Images/Atack1.png" alt=""><p>Магия огня</p>\
            <img id="taskWord" src="../../components/Images/Lightning1.png" alt=""><p>Огненные шары</p>\
            <img id="taskСonsonants" src="../../components/Images/Health1.png" alt=""><p>Лечить себя</p>\
            <img id="taskCount" src="../../components/Images/Question1.png" alt=""><p>Магия воды</p>\
            <img id="taskFigure" src="../../components/Images/Atack2.png" alt=""><p>Магия огня</p>\
            <img id="taskPoem" src="../../components/Images/Lightning2.png" alt=""><p>Магия молнии</p>\
            <img id="taskSequence" src="../../components/Images/Health2.png" alt=""><p>Лечить себя</p>\
            <img id="taskSpace" src="../../components/Images/Question2.png" alt=""><p>Магия огня</p>\
            <img id="taskSyllable" src="../../components/Images/Atack3.png" alt=""><p>Огненные шары</p>\
            <img id="taskTime" src="../../components/Images/Health3.png" alt=""><p>Магия огня</p>\
            <img id="taskVowels" src="../../components/Images/Question3.png" alt=""><p>Удар радуги</p>\
</div></div><button class="buttonStart" id="start">Выберите магию</button>';
        mainField.appendChild(modalWindow);

        const mainMonster = document.createElement('div');
        mainMonster.className = 'monster';
        buildPerson(mainMonster, getRandomArbitrary(2, 4), getRandomArbitrary(2, 4), getRandomArbitrary(2, 4));

        const movement = document.querySelectorAll('.head');
        personMove(movement, 25);
        personMove(document.querySelectorAll('.weapon'), 75);


        function buildPerson(element, number1, number2, number3) {
            const frag = '<div class="weapon" id=""><img src="../../components/Images/' + number3 + '-weapon.png" alt="" /></div><div class="head" id=""><img src="../../components/Images/' + number1 + '-head.png" alt="" /></div><div class="body"><img src="../../components/Images/' + number2 + '-foot.png" alt="" /></div>';
            element.innerHTML = frag;
            return mainField.appendChild(element);
        }

        function personMove(array, y0) {
            let pos = 5;
            setInterval(frame, 300);

            function frame() {
                pos *= -1;
                array.forEach((elem) => {
                    elem.style.bottom = `${y0 + pos}px`;
                });
            }
        }
    }    
}
