import {Button, Modal, Space} from "antd";
import React, {useState} from "react";

const BottomContent = () => {
    const { version } = require("../../../package.json");
    const [show,setShow] = useState(false)
    function showReleaseNote(){
        setShow(true)
    }
    return (
        <Space direction="horizontal">

            <span id="busuanzi_container_page_pv">
                本页总访问量<span id="busuanzi_value_page_pv"></span>次 |
            </span>
            <a href="https://github.com/sasaju/change-top-web" target="_blank" rel="noopener noreferrer">工具源码</a> |
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a onClick={showReleaseNote}>
                当前版本：{version}
            </a>
            <ReleaseNoteDialog open={show} onCancel={()=>{setShow(false)}}/>
        </Space>
    );
}

const ReleaseNoteDialog = ({open, onCancel}:{open:boolean, onCancel:() => void}) => {
    return (
        <Modal
        title="更新日志"
        open={open}
        onCancel={onCancel}
        footer={[
            <Button key="know" onClick={onCancel}>
                知道了
            </Button>,
        ]}
        centered={true}
        >
            <p>0.1.2-alpha：实现基本功能  2023-07-19</p>
        </Modal>
    )
}

export default BottomContent;