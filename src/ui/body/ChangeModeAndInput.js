import {Input, Space, Radio, Button, Typography, Spin} from "antd";
import {useImmer} from "use-immer";
const { Text } = Typography;

const modeTitleDict = {
    change:"调整",
    delete:"删除",
    extra:"提取",
}

const ModelParInput = ({nums, titles, placeholders, mode, onListChange, inputValueList, onRunClick, spinning}) => {
    const inputs = [];
    const [inputsStatusList, updateInputStatusList] = useImmer(["", "", ""])
    function onContentChange(event, index){
        onListChange(event, index)
        if (event.target.value<0){
            updateInputStatusList(
                draft => {
                    draft[index] = "error"
                }
            )
        }else {
            updateInputStatusList(
                draft => {
                    draft[index] = ""
                }
            )
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
            status={inputsStatusList[i]}
            type="number"
        />);
    }

    return (
        <Space>
            {inputs}
            <Spin spinning={spinning}>
                <Button type="primary" size="large" onClick={onRunClick}>执行{modeTitleDict[mode]}</Button>
            </Spin>
        </Space>
    )
};

const ModeRadioGroup = ({mode,onModeChange}) => {
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


const ChangeModeAndInput = (
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
