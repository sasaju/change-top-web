import TextArea from "antd/es/input/TextArea";
import {Row} from "antd";
const LeftTextArea = ({value,onChange}) => {
    return(
        <TextArea
            value={value}
            rows={20}
            style={{"fontFamily": "monospace", "fontSize":"15px",flex:1}}
            placeholder="粘贴或点击上方“通过文件导入按钮”"
            onChange={onChange}
        />
    )
}
const RightTextArea = ({value,onChange}) => {
    return(
        <TextArea
            value={value}
            rows={20}
            style={{"fontFamily": "monospace", "fontSize":"15px",flex:1}}
            placeholder="此处输出结果，同时允许对结果进行编辑，可以复制也可以点击编辑框上方的“导出为文件”"
            onChange={onChange}
        />
    )
}

const LeftAndRightTextArea = ({leftValue,onLeftChange, rightValue, onRightChange}) => {
  return(
      <Row style={{width:"95vw", margin:"auto"}}>
          <div style={{width:"10px"}}/>
          <LeftTextArea
              style={{flex:1}}
              value={leftValue}
              onChange={onLeftChange}
          />
          <div style={{width:"10px"}}/>
          <RightTextArea
              style={{flex:1}}
              value={rightValue}
              onChange={onRightChange}
          />
          <div style={{width:"10px"}}/>
      </Row>
  )
}



export default LeftAndRightTextArea;
