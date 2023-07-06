import {containSpecialChar, extractSectionAndFormatAndWrite} from "./TopFileUtil";
import processString from "./StringUtil";

const sectionsNumIndex = {
    atoms:[0, 5],
    bonds:[0,1],
    dihedrals:[0,1,2,3],
    positionRestraints:[0,],
    dihedralRestraints:[0,1,2,3]
}

/**
 * 处理Top的主方法
 * @param contentStr
 * @param outputStr
 * @param mode
 * @param inputContentList
 */
export function read(contentStr, outputStr, mode, inputContentList) {
    let lines = contentStr.split("\n")
    let nowSection = ""

    function checkAndOutputStr(res){
        if (res!==""){
            outputStr(res+"\n")
        }else {
            outputStr("")
        }
    }

    for (const line of lines) {

        // 检查是否是";"或者"#"开头或者无内容，如果是，则直接输出不做处理
        if (containSpecialChar(line)){
            outputStr(line+"\n")
            continue
        }

        // 检查是否"["开头，如果是更新nowSection，然后直接输出
        const firstChar = line.length > 0 ? line[0] : '';
        if (firstChar === "["){
            nowSection = extractSectionAndFormatAndWrite(line)
            outputStr(line+"\n")
            continue
        }

        // 上述检查后，剩下的就是具体内容了，只处理atoms、bonds、dihedrals等含有原子序号的部分
        // 不是上述部分原样输出
        switch (nowSection) {
            case "atoms":
                const res_atoms = handleLine(line, inputContentList, sectionsNumIndex.atoms, mode)
                checkAndOutputStr(res_atoms)
                break
            case "bonds":
                const res_bonds = handleLine(line, inputContentList, sectionsNumIndex.bonds, mode)
                checkAndOutputStr(res_bonds)
                break
            case "dihedrals":
                const dihedrals_res = handleLine(line, inputContentList, sectionsNumIndex.dihedrals, mode)
                checkAndOutputStr(dihedrals_res)
                break
            case "position_restraints":
                const res_pr = handleLine(line, inputContentList, sectionsNumIndex.positionRestraints, mode)
                checkAndOutputStr(res_pr)
                break
            case "dihedral_restraints":
                const res_dr = handleLine(line, inputContentList, sectionsNumIndex.dihedralRestraints, mode)
                checkAndOutputStr(res_dr)
                break
            default:
                outputStr(line+"\n")
                break
        }
    }
}

/**
 * 处理各个mode的调用
 * @param line
 * @param inputContentList
 * @param indexList
 * @param mode
 * @returns {string}
 */
function handleLine(
    line,
    inputContentList,
    indexList,
    mode
) {
    const inputContentIntList = inputContentList.map((i) => Number(i))
    switch (mode) {
        case "change":
            const  changeMap = generateObject(inputContentIntList[0], inputContentIntList[1], inputContentIntList[2])
            return changeLineIndex(line, indexList, changeMap)
        case "delete":
            const delIndexList = range(inputContentIntList[0], inputContentIntList[1])
            return deleteLineIndex(line,indexList, delIndexList)
        case "extra":
            const extraIndexList = range(inputContentIntList[0], inputContentIntList[1])
            return extraLineIndex(line, indexList, extraIndexList)
        default:
            return line
    }
}

/**
 * mode: change 修改index
 * @param {String} line 该行文本
 * @param {String[]} indexList
 * @param {Object} indexMap
 * @returns {string}
 */
function changeLineIndex(
    line,
    indexList,
    indexMap
) {
    const lineStrList = processString(line)
    for (const numIndex of indexList) {
        const oldChar = lineStrList[numIndex]
        const oldIndex = Number(oldChar)
        const oldCharLen = oldChar.length
        const newIndexOrNull = indexMap[oldIndex]
        const newIndex = (newIndexOrNull !== undefined) ? newIndexOrNull : oldIndex
        lineStrList[numIndex] = `${newIndex}`.padStart(oldCharLen, ' ')
    }
    return lineStrList.join("")
}

/**
 * mode:delete line中如果包含 indexList 中的原子序号则返回空字符，否则原样返回
 * @param {string} line
 * @param {number[]} indexList
 * @param {number[]} delIndexList
 * @returns {string}
 */
function deleteLineIndex(
    line,
    indexList,
    delIndexList
){
    const lineStrList = processString(line)
    const lineContainIndex = indexList.map((i) => Number(lineStrList[i]))
    console.log(lineContainIndex)
    if (hasIntersection(lineContainIndex, delIndexList)){
        return ""
    }else {
        return line
    }
}

/**
 * mode:extra line中如果包含 indexList 中的原子序号则原样返回，否则返回空字符
 * @param {string} line
 * @param {number[]} indexList
 * @param {number[]} extraIndexList
 * @returns {string}
 */
function extraLineIndex(
    line,
    indexList,
    extraIndexList
) {
    const lineStrList = processString(line)
    const lineContainIndex = indexList.map((i) => Number(lineStrList[i]))
    if (hasIntersection(lineContainIndex, extraIndexList)){
        return line
    }else {
        return ""
    }
}

/**
 * 生成一个列表，包含起始值
 * @param {number} start
 * @param {number} end
 * @returns {number[]}
 */
const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
}

/**
 * 生成一个map，形如{1: 1, 2: 2, 3: 3}
 * @param start
 * @param end
 * @param add
 * @returns {{}}
 */
const generateObject = (start, end, add=0) => {
    const obj = {};
    for (let i = start; i <= end; i++) {
        obj[i] = i+add;
    }
    return obj;
}

/**
 * 比较两个List是否有交集，有true，没有false
 * @param list1
 * @param list2
 * @returns {boolean}
 */
const hasIntersection = (list1, list2) => {
    for (let i = 0; i < list1.length; i++) {
        if (list2.includes(list1[i])) {
            return true;
        }
    }
    return false;
}
