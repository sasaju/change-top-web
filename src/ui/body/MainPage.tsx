import {Button, message, Space} from "antd";
import ChangeModeAndInput from "./ChangeModeAndInput";
import LeftAndRightTextArea from "./LeftAndRightTextArea";
import DownloadFile from "./ExportResult";
import {ChangeEvent, useState} from "react";
import {useImmer} from "use-immer";
import {handleTopStr} from "../../lib/repo";
import {RadioChangeEvent} from "antd/es/radio/interface";
import BottomContent from "./BottomContent";

const ControlButtons = ({handleFileChosen,handleReset}:{
    handleFileChosen:(file:File) =>void,
    handleReset:() => void
}) => {
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
                    onChange={ (e) => {
                        if (e.target.files == null) {
                            message.info("未选择文件").then()
                        } else {
                            handleFileChosen(e.target.files[0]);
                        }
                    }
                    }
                />
            </Space>
        </>
    )
}

const modesInput: Map<string, { titles: string[], placeholders: string[] }> = new Map([
    ["change", {
        titles: ["起始序号", "截止序号", "增加数值"],
        placeholders: ["包括本身", "包括本身", "填写增加的数值"]
    }],
    ["delete", {
        titles: ["起始序号", "截止序号"],
        placeholders: ["包括本身", "包括本身"]
    }],
    ["extra", {
        titles: ["起始序号", "截止序号"],
        placeholders: ["包括本身", "包括本身"]
    }]
]);

export const MainPage = () => {
    const [leftValue, setLeftValue] = useState("")
    const [rightValue, setRightValue] = useState("")
    const [mode, setMode] = useState("change")
    const [inputList, setInputList] = useState(modesInput.get(mode))
    const [inputContentList, updateInputContentList] = useImmer(["", "", ""])
    const [spinning, setSpinning] = useState(false)


    function onLeftChange(e:ChangeEvent<HTMLInputElement>){
        setLeftValue(e.target.value)
    }
    function onRightChange(e:ChangeEvent<HTMLInputElement>) {
        setRightValue(e.target.value)
    }
    function onModeChange(e:RadioChangeEvent) {
        setMode(e.target.value)
        setInputList(modesInput.get(e.target.value))
    }

    function onInputContentChange(event:ChangeEvent<HTMLInputElement>, index:number){
        updateInputContentList(
            draft => {
                draft[index] = event.target.value
            }
        )
    }

    async function onRunClick() {
        setSpinning(true)
        setRightValue("")
        await handleTopStr(leftValue, mode, inputContentList, (res:string) => {
            setRightValue(rightValue => rightValue + res)
        }).then(
             ()=> {
                 setSpinning(_ => false)
                 message.info("程序还在alpha阶段，请仔细检查生成是否正确，如有错误可以点击下方工具源码提issue",5  )
            }
        )
    }

    function handleFileChosen(selectedFile:File) {
        try{
            const reader = new FileReader();//这是核心！！读取操作都是由它完成的
            reader.readAsText(selectedFile);
            reader.onload = function (oFREvent) {//读取完毕从中取值
                if (oFREvent.target!=null){
                    setLeftValue(oFREvent.target.result as string)
                }
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
        <Space direction="vertical">
            <ControlButtons
                handleFileChosen={handleFileChosen}
                handleReset={handleReset}
            />


            <ChangeModeAndInput
                mode={mode}
                nums={inputList!.titles.length}
                titles={inputList!.titles}
                placeholders={inputList!.placeholders}
                inputValueList={inputContentList}
                onModeChange={onModeChange}
                onInputListChange={onInputContentChange}
                onRunClick={onRunClick}
                spinning={spinning}
            />

            <LeftAndRightTextArea
                leftValue={leftValue}
                onLeftChange={onLeftChange}
                rightValue={rightValue}
                onRightChange={onRightChange}
            />

            <DownloadFile
                text={rightValue}
            />

            <br/><br/>

            <BottomContent/>

            <br/><br/>
        </Space>
    )
}
