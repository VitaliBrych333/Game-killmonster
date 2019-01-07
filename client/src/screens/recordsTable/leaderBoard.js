import { createNode } from '../battlescreen/utils';
import { level } from '../../components/modal-dialog/game';

export function saveInDB() {
    return {
        saveData: async function createUser() {
            const currentData = new Date();
            const userData = {
                name: `${document.querySelector('#firstName').value}`,
                lastName: `${document.querySelector('#lastName').value}`,
                email: `${document.querySelector('#email').value}`,
                date: currentData,
                key: currentData.toLocaleString(),
                score: ((level / 0.25) - 4),
                tab: 0,
            };
            const body = JSON.stringify(userData);

            const res = await fetch('/score', {
                method: 'post',
                headers: {
                    'content-type': 'application/json',
                },
                body,
            });
            return res;
        },
        getData: async function getArrayFields(field, value) {
            async function fetchData() {
                const res = await fetch('/score');
                const users = await res.json();
                return users;
            }

            const users = await fetchData();
            const arrayDB = [];

            function createDB() {
                const length = users.length;
                for (let i = 0; i < length; i += 1) {
                    const fieldKey = {
                        name: `${users[i].name}`,
                        lastName: `${users[i].lastName}`,
                        email: `${users[i].email}`,
                        date: new Date(`${users[i].date}`),
                        score: users[i].score,
                        tab: users[i].tab,
                    };
                    arrayDB.push(fieldKey);
                }
            }
            createDB();
            return filterByField(arrayDB, field, value);
        },
    };
}

export function leaderBoard() {
    const localDB = async () => {
        await saveInDB().getData('tab', parseInt('0', 10)).then((res) => {
            const sorted = sortByField(res, 'score');
            const displayed = displayResult(sorted);
            const resultsTableContainer = document.querySelector('.leaderBoard-results-table');
            const resultsTable = [...resultsTableContainer.firstElementChild.children];
            for (let i = 1; i < resultsTable.length; i += 1) {
                resultsTable[i].remove();
            }
            if (displayed.length === 0) {
                const result = createNode('p', {}, 'Будь первым!');
                resultsTableContainer.firstElementChild.appendChild(result);
            }
            for (let i = 0; i < displayed.length && i < 10; i += 1) {
                const name = displayed[i].name;
                const date = (displayed[i].date).toLocaleDateString();
                const score = displayed[i].score;
                const td1 = createNode('td', {
                    className: 'table-name',
                }, `${name}`);
                const td2 = createNode('td', {}, `${date}`);
                const td3 = createNode('td', {}, `${score}`);
                const tr = createNode('tr', {}, td1, td2, td3);
                resultsTableContainer.firstElementChild.appendChild(tr);
            }
        });
    };
    localDB();
}

function filterByField(arrResults, field, value) {
    return arrResults.filter((elem) => {
        if (elem[field] === value) {
            return elem;
        }
        return elem;
    });
}

function sortByField(arrResults, field) {
    function sorted(a, b) {
        return b[field] - a[field];
    }
    return arrResults.sort(sorted);
}

function displayResult(arrResults, number = arrResults.length) {
    return arrResults.slice(0, number);
}
