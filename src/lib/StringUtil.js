
// input :   1  C  1  URE      C      1     0.880229  12.01000   ; amber C  type
// return:["   1","  C", "  1", "  URE"....]
// 逐个字符读取，首次读到空格继续，当遇到非空格字符以后，再遇到空格添加前面读的东西到列表
function processString(input) {
    const resultList = [];
    let currentWord = '';
    let hasMeetStr = false;

    for (let i = 0; i < input.length; i++) {
        const currentChar = input.charAt(i);
        if (currentChar === ' ' && hasMeetStr) {
            resultList.push(currentWord);
            currentWord = ' ';
            hasMeetStr = false;
            continue;
        }
        currentWord += currentChar;
        hasMeetStr = (currentChar !== ' ');
    }

    if (input === '') {
        resultList.push('');
        return resultList;
    }

    resultList.push(currentWord);

    return resultList;
}

export default processString;