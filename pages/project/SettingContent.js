import React from 'react';
import axios from 'axios';
import {
    Layout,
    Button,
    Breadcrumb,
    Toast,
    Image,
    Typography,
    Input,
    Divider,
    Form,
    Row,
    Col,
} from '@douyinfe/semi-ui';
import "@douyinfe/semi-ui/dist/css/semi.css";
import {
    IconSetting,
} from "@douyinfe/semi-icons";

class ContractDeploy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: {
                name: '',
                age: '',
                role: '',
                history: '',
                diagnosis: '',
                treatment: '',
            }
        };
    }

    handleFormChange = (changedValues, allValues) => {
        this.setState(prevState => ({
            formValues: {...prevState.formValues, ...allValues}
        }));
    };

    handleSubmit = async (values) => {
        const { addresses } = this.state.formValues; // 获取地址字段
        // 简单的格式验证：检查是否包含非字母数字字符（除了逗号和空格）
        const isValidFormat = /^"?(0x[a-fA-F0-9]{40})"?(,"?0x[a-fA-F0-9]{40}"?)*$/.test(addresses);


        if (!isValidFormat) {
            Toast.error("☹️输入格式不正确，请按提示修改，或前往状态面板复制标准信息");
            return;
        }
        // 预处理输入字符串，将其转换为地址数组
        const addressArray = addresses.split(',').map(addr => addr.trim()); // 转换为数组并去除前后空格


        const response = await fetch('http://127.0.0.1:8080/api/status',{
            method:'POST',
        });
        const data = await response.json()
        const judge = data.status

        if(judge){
            Toast.error("当前投票已开启，请结束投票再创建")
            return ;
        }

        try {
            // 将地址数组以 JSON 格式发送给后端
            const response = await axios.post('http://127.0.0.1:8080/api/transaction', addressArray);
            Toast.success(`创建候选者列表完成！投票状态变更为开启，本次交易哈希为: ${response.data.txHash}`);
        } catch (error) {
            console.error('Error submitting form:', error.response ? error.response.data : error.message);
            Toast.error('数据提交失败');
        }

    };

    render() {
        const { Section, Input, Select, TextArea, Checkbox } = Form;
        const { Option } = Select;
        const { Title, Paragraph, Text } = Typography;
        const { Content } = Layout;

        return (
            <Content
                style={{
                    padding: '24px',
                    backgroundColor: 'var(--semi-color-bg-0)',
                }}
            >
                <Breadcrumb
                    style={{
                        marginBottom: '24px',
                    }}
                    routes={
                        [
                            {
                                path: '/',
                                name:'blockvote',
                            },
                            {
                                path: '/setting',
                                name: 'setting',
                                icon: <IconSetting size="small" />
                            },

                        ]
                    }
                />
                <div
                    style={{
                        borderRadius: '10px',
                        border: '1px solid var(--semi-color-border)',
                        height: '390px',
                        padding: '32px',
                    }}
                >
                    <Title style={{ margin: '8px 0', marginLeft: "200" }}>BlockVote --添加候选地址测试界面</Title>
                    <Divider margin='12px'/>
                    <Image
                        className="image"
                        width={300}
                        height={280}
                        src="../static/cat.jpg"
                        style={{float:"right",marginTop:50}}
                    />
                    <br/>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Form
                            style={{ padding: 10, width: '100%' }}
                            onValueChange={this.handleFormChange}
                            onSubmit={this.handleSubmit}
                        >
                            <Section text={'Addcandidate-->投票开始'}>
                                <Row>
                                    <Col span={12}>
                                        <Input
                                            field="addresses"
                                            label="候选地址"
                                            style={{ width: '100%' }}
                                            trigger='blur'
                                            placeholder='传入地址串，英文逗号分隔，形如"addr1","addr2","addr3"'
                                        />
                                    </Col>

                                </Row>
                            </Section>
                            <Checkbox value="false" field="agree" noLabel={true}>
                                请确保地址无误,此操作将创建候选人列表并开启投票
                            </Checkbox>
                            <Button type="primary" htmlType="submit" className="btn-margin-right">提交(submit)</Button>
                            <Button htmlType="reset">重置(reset)</Button>

                        </Form>
                    </div>
                </div>
                <style jsx>
                    {`
                        button {
                            padding: 9px 16px;
                            max-height: 40px;
                            border-color: #c8f8b8;
                            color: #e7c8a1;
                            background-color: #f1ebc5;
                            border-radius: 8px;
                            align-items: center;
                            font-size: 16px;
                            font-weight: 500;
                            text-align: center;
                            font-weight: bold;
                            cursor: pointer;
                        }
                        
                        input {
                            border-bottom-style: groove;
                            font-size: 16px;
                            width: 63.5%;
                            border-color: rgba(var(--semi-grey-9), 1);
                            line-height: 32px;
                        }
                    `}
                </style>
            </Content>
        );
    }
}

export default ContractDeploy;
