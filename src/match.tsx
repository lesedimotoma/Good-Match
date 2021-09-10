export const match = (name1: string, name2: string ) => {

    if (name1 === '' || name2 === ''){
        return console.error('Invalid input')
    }
    
    let sentence = name1 + ' matches ' + name2
    let splitStr = sentence.replace(/s/g, '').split('')

    return ""
}