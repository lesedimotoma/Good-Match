export const match = (name1: string, name2: string ) => {

    if (name1 === '' || name2 === ''){
        return console.error('Invalid input')
    }
    
    let sentence = name1 + ' matches ' + name2
    let splitStr = sentence.toLowerCase().replace(/\s/g, '').split('')

    let result = splitStr.map(item => {
        const length = splitStr.filter(ch => item === ch).length
        splitStr = splitStr.filter(ch => ch != item)
        return length
    }).filter(item => item != 0)

    return result
}

console.log(match('Jack', 'Jill'))