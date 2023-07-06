import React from 'react';
import {Button, message} from 'antd';
import { saveAs } from 'file-saver';

const DownloadFile = ({filename, text}) => {
    const handleDownload = () => {
        if (text===""){
            message.error("结果为空")
            return
        }
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, filename);
    };

    return (
        <Button type="primary" onClick={handleDownload} size="large">
            导出结果
        </Button>
    );
};

export default DownloadFile;
