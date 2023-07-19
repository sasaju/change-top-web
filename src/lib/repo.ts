import {read} from "./ChangeTop";

// function sleep (time) {
//     return new Promise((resolve) => setTimeout(resolve, time));
// }

export function handleTopStr(leftValue:string, mode:string,inputContentList:string[] ,outputOneLine:(oneLine:string)=>void) {
    return new Promise(function (resolve, reject) {
        try{
            read(leftValue, (oneLine) => outputOneLine(oneLine), mode, inputContentList)
            resolve("ok")
        }catch (e){
            resolve("error")
        }

    })
}
