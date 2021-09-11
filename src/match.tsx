const csv = require('csv-parser')
import * as fs from 'fs'

/**
 * Runs the good match algrothim on the names in the csv file and prints the results to a output.txt
 * @param filename 
 */
const readcsv = (filename: string) => {
    let male: string[] = []
    let female: string[] = []
    let output: string[] = []
    const readstream = fs.createReadStream(filename)
    readstream.on('open', () => {
        readstream.pipe(csv(['name', 'gender']))
            .on('data', (row: any) => {
                if(row.gender.includes('f')) {
                    female = addToArray(female, row.name)
                }
                else male = addToArray(male, row.name)

            })
            .on('end', () => {

                female.map(f => {
                    male.map(m => {
                        output.push(match(f, m))

                    })
                })

                fs.writeFile('output.txt',output.join('\n') , (err: any) => {
                    if(err) {
                        return console.error(err)
                    }
                })
                
            })

    })
       
    readstream.on('error', (err) => {
        console.error(err)
    })
    
}

/**
 * Appends a specified to a given array on condition that word doesnt already exist in the array 
 * @param arr 
 * @param word 
 * @returns array with the new word appended to it 
 */
const addToArray = (arr: string[], word: string) => {
    if(!arr.some(item => item === word)){
        arr.push(word.trim())
    }
    return arr
}

/**
 * Calculates match percentage between two names
 * @param name1 
 * @param name2 
 * @returns a sentence mentioning the matched names and their % match 
 */
export const match = (name1: string, name2: string ): string => {

    if ( !isValid(name1) || !isValid(name2) ){
        console.error('Invalid input')
        return ''
    }
    
    let sentenceResult = name1 + ' matches ' + name2
    let splitStr: string[] = sentenceResult.toLowerCase().replace(/\s/g, '').split('')

    let chCount = splitStr.map(item => {
        const length = splitStr.filter(ch => item === ch).length
        splitStr = splitStr.filter(ch => ch != item)
        return length
    }).filter(item => item != 0)

    let resultCount = chCount.join('').split('')
    resultCount = reduceNumber(resultCount)

    let sentence = +resultCount.join('')
    sentenceResult += sentence > 80? ' '.concat(sentence.toString(), '%, good match')  : ' '.toString().concat(sentence.toString(), '%')

    return sentenceResult
}


/**
 * finds the match percentage of two words
 * @param resultCount 
 * @returns string array containing resulting reduction
 */
const reduceNumber = (resultCount: string[]) => {
    let length = resultCount.length
    let result: string[] = []
    while( length > 2 ){
        
        resultCount.some((item, idx) => {
            let sum = 0
            const ret = (length-1)-idx < idx
            
            if(ret) return ret
            if((length-1)-idx > idx){
                sum = +item + +resultCount[(length-1)-idx]
            }else if((length-1)-idx === idx) sum = +item 
            
            result.push(sum.toString())
            
        })

        resultCount = result.join('').split('')
        result = []
        length = resultCount.length
        
    }

    return resultCount
}

/**
 * Checks validity of a given name
 * @param word 
 * @returns a boolean indicating the validity of the name
 */
const isValid = (word: any) => {
    let pattern = /^[a-zA-Z]+$/
    return word !== null && 
            word != undefined && 
            pattern.test(word) &&
            typeof word === 'string' 
            
            
}

console.log(isValid(null))
//readcsv('data.csv' )