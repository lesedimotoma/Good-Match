const csv = require('csv-parser')
import * as fs from 'fs'

const readcsv = (filename: string) => {
    let male: string[] = []
    let female: string[] = []
    const readstream = fs.createReadStream(__dirname+ '/../../src/'+ filename)
    readstream.on('open', () => {
        readstream.pipe(csv(['name', 'gender']))
            .on('data', (row: any) => {
                if(row.gender.includes('f')) {
                    female = addToArray(female, row.name)
                }
                else male = addToArray(male, row.name)

                console.log(male, female)
            })
    })
       
    readstream.on('error', (err) => {
        console.error(err)
    })

    console.log('female', female)
    console.log('male', male)
    
}


const addToArray = (arr: string[], word: string) => {
    if(!arr.some(item => item === word)){
        arr.push(word)
    }
    return arr
}

/**
 * 
 * @param name1 
 * @param name2 
 * @returns a sentence mentioning the matched names and their % match 
 */
export const match = (name1: string, name2: string ) => {

    if ( name1 == null || name2 == null || name1.match(/\s/g) ||  name2.match(/\s/g)  ){
        return console.error('Invalid input')
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
 * 
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


readcsv('data.csv' )