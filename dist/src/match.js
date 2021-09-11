"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.match = void 0;
const csv = require('csv-parser');
const fs = __importStar(require("fs"));
const readcsv = (filename) => {
    let male = [];
    let female = [];
    const readstream = fs.createReadStream(__dirname + '/../../src/' + filename);
    readstream.on('open', () => {
        readstream.pipe(csv(['name', 'gender']))
            .on('data', (row) => {
            if (row.gender.includes('f')) {
                female = addToArray(female, row.name);
            }
            else
                male = addToArray(male, row.name);
            console.log(male, female);
        });
    });
    readstream.on('error', (err) => {
        console.error(err);
    });
    console.log('female', female);
    console.log('male', male);
};
const addToArray = (arr, word) => {
    if (!arr.some(item => item === word)) {
        arr.push(word);
    }
    return arr;
};
/**
 *
 * @param name1
 * @param name2
 * @returns a sentence mentioning the matched names and their % match
 */
const match = (name1, name2) => {
    if (name1 == null || name2 == null || name1.match(/\s/g) || name2.match(/\s/g)) {
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
/**
 *
 * @param resultCount
 * @returns string array containing resulting reduction
 */
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
readcsv('data.csv');
//# sourceMappingURL=match.js.map