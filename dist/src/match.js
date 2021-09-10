"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.match = void 0;
/**
 *
 * @param name1
 * @param name2
 * @returns
 */
const match = (name1, name2) => {
    if (name1 === '' || name2 === '') {
        return console.error('Invalid input');
    }
    let sentenceResult = name1 + ' matches ' + name2;
    let splitStr = sentenceResult.toLowerCase().replace(/\s/g, '').split('');
    let chCount = splitStr.map(item => {
        const length = splitStr.filter(ch => item === ch).length;
        splitStr = splitStr.filter(ch => ch != item);
        return length;
    }).filter(item => item != 0);
    let resultCount = chCount.join('').split('');
    resultCount = reduceNumber(resultCount);
    let sentence = +resultCount.join('');
    sentenceResult += sentence > 80 ? ' '.concat(sentence.toString(), '%, good match') : ' '.toString().concat(sentence.toString(), '%');
    return sentenceResult;
};
exports.match = match;
const reduceNumber = (resultCount) => {
    let length = resultCount.length;
    let result = [];
    while (length > 2) {
        resultCount.some((item, idx) => {
            let sum = 0;
            const ret = (length - 1) - idx < idx;
            if (ret)
                return ret;
            if ((length - 1) - idx > idx) {
                sum = +item + +resultCount[(length - 1) - idx];
            }
            else if ((length - 1) - idx === idx)
                sum = +item;
            result.push(sum.toString());
        });
        resultCount = result.join('').split('');
        result = [];
        length = resultCount.length;
    }
    return resultCount;
};
console.log((0, exports.match)('Jack', 'Jill'));
//# sourceMappingURL=match.js.map