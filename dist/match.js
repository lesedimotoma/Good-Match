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
const readLine = __importStar(require("readline"));
/**
 * Runs the good match algrothim on the names in the csv file and prints the results to a output.txt
 * @param filename
 */
const readcsv = (filename) => {
    let male = [];
    let female = [];
    let output = [];
    const readstream = fs.createReadStream(filename);
    readstream.on('open', () => {
        readstream.pipe(csv(['name', 'gender']))
            .on('data', (row) => {
            if (row.gender.includes('f')) {
                female = addToArray(female, row.name);
            }
            else
                male = addToArray(male, row.name);
        })
            .on('end', () => {
            female.map(f => {
                male.map(m => {
                    output.push((0, exports.match)(f, m));
                });
            });
            fs.writeFile('output.txt', output.join('\n'), (err) => {
                if (err) {
                    return console.error(err);
                }
            });
        });
    });
    readstream.on('error', (err) => {
        console.error(err);
    });
};
/**
 * Appends a specified to a given array on condition that word doesnt already exist in the array
 * @param arr
 * @param word
 * @returns array with the new word appended to it
 */
const addToArray = (arr, word) => {
    if (!arr.some(item => item === word)) {
        arr.push(word.trim());
    }
    return arr;
};
/**
 * Calculates match percentage between two names
 * @param name1
 * @param name2
 * @returns a sentence mentioning the matched names and their % match
 */
const match = (name1, name2) => {
    if (!isValid(name1) || !isValid(name2)) {
        console.error('Error: Invalid input');
        return '';
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
 * finds the match percentage of two words
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
/**
 * Checks validity of a given name
 * @param word
 * @returns a boolean indicating the validity of the name
 */
const isValid = (word) => {
    let pattern = /^[a-zA-Z]+$/;
    return word !== null &&
        word != undefined &&
        pattern.test(word) &&
        typeof word === 'string';
};
const read = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});
read.question("Enter the two names you want to match: ", input => {
    const names = input.toString().split(' ');
    const output = (0, exports.match)(names[0], names[1]);
    console.log("Output: ", output);
    read.close();
});
//console.log(isValid(null))
//readcsv('data.csv' )
//# sourceMappingURL=match.js.map