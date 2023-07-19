import React, {useState} from 'react';
import {Button, Input, message, Space, Typography} from 'antd';
import { saveAs } from 'file-saver';
const {Text} = Typography;

const DownloadFile = ({text}:{text:string}) => {
    const [filename, updateFilename] = useState("result.txt")
    const handleDownload = () => {
        if (text===""){
            message.error("结果为空")
            return
        }
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, filename);
    };

    return (
        <Space direction="horizontal">
            <Text>
                输出文件名：
            </Text>
            <Input
                key="filename"
                placeholder="输入文件名"
                size="large"
                value={filename}
                onChange={(i) => updateFilename(i.target.value)}
            />
            <Button type="primary" onClick={handleDownload} size="large">
                导出结果
            </Button>
        </Space>
    );
};

export default DownloadFile;
