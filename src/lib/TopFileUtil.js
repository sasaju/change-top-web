// 检查是否是";"或者"#"开头或者无内容
export function containSpecialChar(text){
    const specialChars = ['#', ';'];
    const firstChar = text.length > 0 ? text[0] : '';
    if (firstChar===''){
        return true
    }
    return specialChars.includes(firstChar);
}

export function extractSectionAndFormatAndWrite(input) {
    const extracted = input.split(";")[0].replace("[", '').replace("]", '').trim();
    return extracted.toLowerCase();
}
