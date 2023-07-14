import { Typography, Divider } from 'antd';
import React from "react";

const { Title, Paragraph } = Typography;

interface WebsiteTitleProps {
    text: string;
}

const WebsiteTitle: React.FC<WebsiteTitleProps> = ({ text }) => {
    return (
        <div>
            {/*满天星紫*/}
            <Title level={2} style={{ textAlign: 'left', margin: '6px 30px', color: "#2e317c" }}>
                {text}
            </Title>
            <Paragraph style={{ textAlign: 'left', margin: '0px 30px', color: "#2e317c" }}>用于调整拓扑文件的在线工具</Paragraph>
            <Divider style={{ marginLeft: 0, boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.2)' }} />
        </div>
    );
};

export default WebsiteTitle;
