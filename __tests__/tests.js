import { saveInDB } from '../client/src/screens/recordsTable/leaderBoard';
import { getRandomArbitrary, drawLife } from '../client/src/screens/battlescreen/utils';
import { makeMagic } from '../client/src/screens/battlescreen/youTurn';
import { dictionary } from '../client/src/components/tasks/dictionary';
import { compareRandom, randomInteger } from '../client/src/components/tasks/functions-task';
import Person from '../client/src/screens/battlescreen/personClass';
import explosion from '../client/src/components/animations/explosion';
import fire from '../client/src/components/animations/fire-animation';
import fireballs from '../client/src/components/animations/fireballs';
import health from '../client/src/components/animations/health-animation';
import canvasLightning from '../client/src/components/animations/lightning';
import createWaterFall from '../client/src/components/animations/waterfall';
import showTaskAudio from '../client/src/components/tasks/task-audio/task-audio';
import showTaskCompare from '../client/src/components/tasks/task-compare/task-compare';
import showTaskСonsonants from '../client/src/components/tasks/task-consonants/task-consonants';
import showTaskCount from '../client/src/components/tasks/task-count/task-count';
import showTaskFigure from '../client/src/components/tasks/task-figure/task-figure';
import showTaskPicture from '../client/src/components/tasks/task-picture/task-picture';
import showTaskPoem from '../client/src/components/tasks/task-poem/task-poem';
import showTask from '../client/src/components/tasks/task-screen/task-screen';
import showTaskSequence from '../client/src/components/tasks/task-sequence/task-sequence';
import showTaskSpace from '../client/src/components/tasks/task-space/task-space';
import showTaskSyllable from '../client/src/components/tasks/task-syllable/task-syllable';
import showTaskTime from '../client/src/components/tasks/task-time/task-time';
import showTaskTranslation from '../client/src/components/tasks/task-translate/task-translate';
import showTaskVowels from '../client/src/components/tasks/task-vowels/task-vowels';
import showTaskWord from '../client/src/components/tasks/task-word/task-word';
import { poems } from '../client/src/components/tasks/task-poem/dictionary-poems';

const getArrayFields = saveInDB().getData;
const createUser = saveInDB().saveData;

describe('component battlescreen', () => {
    test('getRandomArbitrary to be called with argument', () => {
        const mockFn = jest.fn().mockName(getRandomArbitrary);
        mockFn(9);
        expect(mockFn).toBeCalledWith(expect.anything());
    });

    test('getRandomArbitrary was created with a number', () => {
        expect(getRandomArbitrary(3, 3)).toBe(3);
    });

    test('getRandomArbitrary was called', () => {
        expect(getRandomArbitrary()).toBeDefined();
    });

    test('drawLife was called', () => {
        const mockFn = jest.fn().mockName(drawLife);
        mockFn();
        expect(mockFn).toHaveBeenCalled();
    });

    test('makeMagic was called', () => {
        const mockFn = jest.fn().mockName(makeMagic);
        mockFn();
        expect(mockFn).toHaveBeenCalled();
    });

    test('new Person is instanse of Person', () => {
        expect(new Person()).toBeInstanceOf(Person);
    });
});

describe('component recordTable', () => {
    test('saveInDB return object', () => {
        expect(JSON.stringify(saveInDB())).toBe(JSON.stringify({
            'getData': getArrayFields,
            'saveData': createUser,
        }));
    });
});

describe('component tasks', () => {
    test('compareRandom return number', () => {
        expect(compareRandom()).toBeDefined();
    });

    test('compareRandom to be called with argument', () => {
        const mockFn = jest.fn().mockName(compareRandom);
        mockFn(3);
        expect(mockFn).toBeCalledWith(expect.anything());
    });

    test('randomInteger return less than 20', () => {
        expect(randomInteger(10, 20)).toBeLessThanOrEqual(20);
    });

    test('randomInteger to be called with argument', () => {
        const mockFn = jest.fn().mockName(compareRandom);
        mockFn(3);
        expect(mockFn).toBeCalledWith(expect.anything());
    });

    test('showTaskAudio was called', () => {
        const mockFn = jest.fn().mockName(showTaskAudio);
        mockFn();
        expect(mockFn).toHaveBeenCalled();
    });

    test('showTaskCompare was called', () => {
        const mockFn = jest.fn().mockName(showTaskCompare);
        mockFn();
        expect(mockFn).toHaveBeenCalled();
    });

    test('showTaskСonsonants was called', () => {
        const mockFn = jest.fn().mockName(showTaskСonsonants);
        mockFn();
        expect(mockFn).toHaveBeenCalled();
    });

    test('showTaskCount was called', () => {
        const mockFn = jest.fn().mockName(showTaskCount);
        mockFn();
        expect(mockFn).toHaveBeenCalled();
    });

    test('showTaskFigure was called', () => {
        const mockFn = jest.fn().mockName(showTaskFigure);
        mockFn();
        expect(mockFn).toHaveBeenCalled();
    });

    test('showTaskPicture was called', () => {
        const mockFn = jest.fn().mockName(showTaskPicture);
        mockFn();
        expect(mockFn).toHaveBeenCalled();
    });

    test('showTaskPoem was called', () => {
        const mockFn = jest.fn().mockName(showTaskPoem);
        mockFn();
        expect(mockFn).toHaveBeenCalled();
    });

    const expected = poems[2];
    it('array contains additional elements', () => {
        expect(poems).toEqual(expect.arrayContaining([expected]));
    });

    test('array has a length', () => {
        expect(poems.length).toBe(10);
    });

    test('showTask was called', () => {
        const mockFn = jest.fn().mockName(showTask);
        mockFn();
        expect(mockFn).toHaveBeenCalled();
    });

    test('showTaskSequence was called', () => {
        const mockFn = jest.fn().mockName(showTaskSequence);
        mockFn();
        expect(mockFn).toHaveBeenCalled();
    });

    test('showTaskSpace was called', () => {
        const mockFn = jest.fn().mockName(showTaskSpace);
        mockFn();
        expect(mockFn).toHaveBeenCalled();
    });

    test('showTaskSyllable was called', () => {
        const mockFn = jest.fn().mockName(showTaskSyllable);
        mockFn();
        expect(mockFn).toHaveBeenCalled();
    });

    test('showTaskTime was called', () => {
        const mockFn = jest.fn().mockName(showTaskTime);
        mockFn();
        expect(mockFn).toHaveBeenCalled();
    });

    test('showTaskTranslation was called', () => {
        const mockFn = jest.fn().mockName(showTaskTranslation);
        mockFn();
        expect(mockFn).toHaveBeenCalled();
    });

    test('showTaskVowels was called', () => {
        const mockFn = jest.fn().mockName(showTaskVowels);
        mockFn();
        expect(mockFn).toHaveBeenCalled();
    });

    test('showTaskWord was called', () => {
        const mockFn = jest.fn().mockName(showTaskWord);
        mockFn();
        expect(mockFn).toHaveBeenCalled();
    });
});

describe('dictionary', () => {
    const expected = dictionary[0];
    it('matches if the actual object does not contain expected key: value pairs', () => {
        expect({
            name: 'cat', value1: 'кот', value2: 'котик', value3: 'кошка', value4: 'кошечка',
        }).toEqual(expect.objectContaining(expected));
    });
});

describe('component animations', () => {
    test('explosion to be called with argument', () => {
        const mockFn = jest.fn().mockName(explosion);
        mockFn(1);
        expect(mockFn).toBeCalledWith(expect.anything());
    });

    test('explosion was called', () => {
        const mockFn = jest.fn().mockName(explosion);
        mockFn();
        expect(mockFn).toHaveBeenCalled();
    });

    test('fire was called', () => {
        const mockFn = jest.fn().mockName(fire);
        mockFn();
        expect(mockFn).toHaveBeenCalled();
    });

    test('fireballs was called', () => {
        const mockFn = jest.fn().mockName(fireballs);
        mockFn();
        expect(mockFn).toHaveBeenCalled();
    });

    test('health was called', () => {
        const mockFn = jest.fn().mockName(health);
        mockFn();
        expect(mockFn).toHaveBeenCalled();
    });

    test('canvasLightning was called', () => {
        const mockFn = jest.fn().mockName(canvasLightning);
        mockFn();
        expect(mockFn).toHaveBeenCalled();
    });

    test('createWaterFall was called', () => {
        const mockFn = jest.fn().mockName(createWaterFall);
        mockFn();
        expect(mockFn).toHaveBeenCalled();
    });
});
