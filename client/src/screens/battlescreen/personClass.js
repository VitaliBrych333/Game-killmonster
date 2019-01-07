export default class Person {
    constructor(name, level) {
        this.name = name;
        this.score = Math.round(100 * level);
    }
}
