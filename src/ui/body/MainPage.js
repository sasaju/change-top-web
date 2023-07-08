import {Button, message, Space} from "antd";
import ChangeModeAndInput from "./ChangeModeAndInput";
import LeftAndRightTextArea from "./LeftAndRightTextArea";
import DownloadFile from "./ExportResult";
import {useState} from "react";
import {useImmer} from "use-immer";
import {handleTopStr} from "../../lib/repo";

const ControlButtons = ({handleFileChosen,handleReset}) => {
    function handleChoseClick() {
        const fileInput = document.getElementById("fileChoose");
        if (fileInput) {
            fileInput.click();
        }
    }
    return (
        <>
            <Space wrap>
                <Button type="primary" size="large" onClick={handleChoseClick}>
                    通过文件导入
                </Button>
                <Button type="dashed" size="large" onClick={handleReset}>
                    全部清空重置
                </Button>
                <input
                    type="file"
                    id="fileChoose"
                    style={{ display: "none", margin: '8px 8px' }}
                    accept=".top, .itp"
                    onChange={(e) => {
                        handleFileChosen(e.target.files[0]);
                    }}
                />
            </Space>
        </>
    )
}

const modesInput = {
    change:{
        titles:["起始序号","截止序号","增加数值"],
        placeholders:["包括本身", "包括本身","填写增加的数值"]
    },
    delete:{
        titles:["起始序号","截止序号"],
        placeholders:["包括本身", "包括本身"]
    },
    extra:{
        titles:["起始序号","截止序号"],
        placeholders:["包括本身", "包括本身"]
    },
}
export const MainPage = () => {
    const [leftValue, setLeftValue] = useState("")
    const [rightValue, setRightValue] = useState("")
    const [mode, setMode] = useState("change")
    const [inputList, setInputList] = useState(modesInput[mode])
    const [inputContentList, updateInputContentList] = useImmer(["", "", ""])
    const [spinning, setSpinning] = useState(false)


    function onLeftChange(e){
        setLeftValue(e.target.value)
    }
    function onRightChange(e) {
        setRightValue(e.target.value)
    }
    function onModeChange(e) {
        setMode(e.target.value)
        setInputList(modesInput[e.target.value])
    }

    function onInputContentChange(event, index){
        updateInputContentList(
            draft => {
                draft[index] = event.target.value
            }
        )
    }

    async function onRunClick() {
        setSpinning(true)
        setRightValue("")
        await handleTopStr(leftValue, mode, inputContentList, (res) => {
            setRightValue(rightValue => rightValue + res)
        }).then(
             ()=> {
                 setSpinning(_ => false)
                 message.info("程序还在alpha阶段，请仔细检查生成是否正确，如有错误可以点击下方工具源码提issue",5  )
            }
        )
    }

    function handleFileChosen(selectedFile) {
        try{
            const reader = new FileReader();//这是核心！！读取操作都是由它完成的
            reader.readAsText(selectedFile);
            reader.onload = function (oFREvent) {//读取完毕从中取值
                setLeftValue(oFREvent.target.result)
            }
        } catch (e){
            message.info("未选择文件")
        }
    }

    function handleReset(){
        setLeftValue("")
        setRightValue("")
        updateInputContentList(
            ["","",""]
        )
    }
    return(
        <>
            <ControlButtons
                handleFileChosen={handleFileChosen}
                handleReset={handleReset}
            />

            <br/><br/>

            <ChangeModeAndInput
                mode={mode}
                nums={inputList.titles.length}
                titles={inputList.titles}
                placeholders={inputList.placeholders}
                inputValueList={inputContentList}
                onModeChange={onModeChange}
                onInputListChange={onInputContentChange}
                onRunClick={onRunClick}
                spinning={spinning}
            />

            <br/><br/>

            <LeftAndRightTextArea
                leftValue={leftValue}
                onLeftChange={onLeftChange}
                rightValue={rightValue}
                onRightChange={onRightChange}
            />

            <br/><br/>

            <DownloadFile
                filename="rerult.txt"
                text={rightValue}
            />
        </>
    )
}
