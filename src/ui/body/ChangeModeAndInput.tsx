import {Input, Space, Radio, Button, Typography, Spin, Tooltip} from "antd";
import {useImmer} from "use-immer";
import React, {JSX} from "react";
import {RadioChangeEvent} from "antd/es/radio/interface";
const { Text } = Typography;

const modeTitleDict = new Map([
    ["change","调整"],
    ["delete","删除"],
    ["extra","提取"],
])

interface ModelParInputProps {
    nums: number;
    titles: string[];
    placeholders: string[];
    mode: string;
    onListChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    inputValueList: string[];
    onRunClick: () => void;
    spinning: boolean;
}

const ModelParInput:React.FC<ModelParInputProps> = ({nums, titles, placeholders, mode, onListChange, inputValueList, onRunClick, spinning}) => {
    const inputs:JSX.Element[] = [];
    const [inputsStatusList, updateInputStatusList] = useImmer(["", "", ""])
    function onContentChange(event: React.ChangeEvent<HTMLInputElement>, index: number) {
        onListChange(event, index);
        if (Number(event.target.value) < 0) {
            updateInputStatusList(draft => {
                draft[index] = "error";
            });
        } else {
            updateInputStatusList(draft => {
                draft[index] = "";
            });
        }
    }

    for (let i = 0; i < nums; i++) {
        inputs.push(<Input
            key={i}
            placeholder={placeholders[i]}
            size="large"
            addonBefore={titles[i]}
            value={inputValueList[i]}
            onChange={(e) => onContentChange(e, i)}
            status={inputsStatusList[i] as "" | "error" | "warning" | undefined}
            type="number"
        />);
    }

    return (
        <Space>
            {inputs}
            <Spin spinning={spinning}>
                <Tooltip title="目前支持atoms、bonds、pairs、angles、dihedrals、position_restraints、dihedral_restraints的序号处理">
                <Button type="primary" size="large" onClick={onRunClick}>执行{modeTitleDict.get(mode)}</Button>
                </Tooltip>
            </Spin>
        </Space>
    )
};

const ModeRadioGroup = ({mode,onModeChange}:{mode:String, onModeChange: (e: RadioChangeEvent) => void}) => {
    return (
        <Space direction="horizontal">
            <Text>执行模式：</Text>
            <Radio.Group defaultValue="change" size="large" optionType="button" onChange={onModeChange} value={mode}>
                <Radio.Button value="change">调整</Radio.Button>
                {/*<Radio.Button value="add">添加</Radio.Button>*/}
                <Radio.Button value="delete">删除</Radio.Button>
                <Radio.Button value="extra">提取</Radio.Button>
            </Radio.Group>
        </Space>
    )
}


interface ChangeModeAndInputProps {
    mode:string,
    nums:number,
    titles:string[],
    placeholders: string[],
    onModeChange:(e: RadioChangeEvent) => void,
    onInputListChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void,
    inputValueList:string[],
    onRunClick:() => void,
    spinning:boolean
}
const ChangeModeAndInput:React.FC<ChangeModeAndInputProps> = (
    {mode, nums, titles, placeholders, onModeChange, onInputListChange, inputValueList, onRunClick, spinning}
) => {
    return (
        <Space direction="vertical">
            <ModeRadioGroup onModeChange={onModeChange} mode={mode}/>
            <ModelParInput
                nums={nums}
                titles={titles}
                placeholders={placeholders}
                mode={mode}
                onListChange={onInputListChange}
                inputValueList={inputValueList}
                onRunClick={onRunClick}
                spinning={spinning}
            />
        </Space>
    )
}

export default ChangeModeAndInput;
