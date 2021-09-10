"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.match = void 0;
const match = (name1, name2) => {
    if (name1 === '' || name2 === '') {
        return console.error('Invalid input');
    }
    let sentence = name1 + ' matches ' + name2;
    let splitStr = sentence.toLowerCase().replace(/\s/g, '').split('');
    let result = splitStr.map(item => {
        const length = splitStr.filter(ch => item === ch).length;
        splitStr = splitStr.filter(ch => ch != item);
        return length;
    }).filter(item => item != 0);
    return result;
};
exports.match = match;
console.log((0, exports.match)('Jack', 'Jill'));
//# sourceMappingURL=match.js.map