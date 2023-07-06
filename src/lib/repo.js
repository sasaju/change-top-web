import {read} from "./ChangeTop";

// function sleep (time) {
//     return new Promise((resolve) => setTimeout(resolve, time));
// }

export function handleTopStr(leftValue, mode,inputContentList ,outputOneLine) {
    return new Promise(function (resolve, reject) {
        read(leftValue, (oneLine) => outputOneLine(oneLine),mode, inputContentList)
        resolve()
    })
}
