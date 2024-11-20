import React, { useState} from 'react';
import {
    Layout,
    Button,
    Breadcrumb,
    Avatar,
    Toast, Card, Col, Row, Highlight, Checkbox, Transfer, Divider, TextArea
} from '@douyinfe/semi-ui';
import {
    IconBeaker, IconClose, IconSort,
} from '@douyinfe/semi-icons';
import "@douyinfe/semi-ui/dist/css/semi.css";
const ListContent = () => {
    const { Header, Footer, Sider, Content } = Layout;
    const allCandidate = async () => {
        try{
            const response = await fetch('http://127.0.0.1:8080/api/all',{
                method:'POST',
            });
            const data = await response.json()
            console.log(data)
            let opts = {
                content: '👨‍👩‍👧‍👧候选者链上地址列表为:  '+data.all+"（此数据由链上读取）",
                duration: 2,
                theme: 'light',
            };
            Toast.info(opts)
        }catch (error){
            Toast.error(error.message)
        }

    }

    const getWinner = async () => {
        try{
            //先拿到当前投票状态
            const response1 = await fetch('http://127.0.0.1:8080/api/status',{
                method:'POST',
            });
            const data1 = await response1.json()
            if(data1.status){
                Toast.info("投票未结束，请等待管理员结束投票再查看获胜者")
                return ;
            }
            const response = await fetch('http://127.0.0.1:8080/api/winner',{
                method:'POST',
            });
            const data = await response.json()
                let opts = {
                    content: '🥳上一轮投票获胜者的区块链地址是:  '+data.winnerAddress,
                    duration: 2,
                    theme: 'light',
                };
                Toast.success(opts)
        }catch (error){
            Toast.error(error.message)
        }
    }

    const getVoteStatus = async () => {
        try{
            const response = await fetch('http://127.0.0.1:8080/api/status',{
                method:'POST',
            });
            const data = await response.json()
            if(data.status){
                let opts = {
                    content: "🙋‍♂️当前投票已开始，请认真核对地址并投出自己的一票",
                    duration: 2,
                    theme: 'light',
                };
                Toast.info(opts )
            }else
            {
                let opts = {
                    content: "🙅‍♂️投票未开始，请前往投票页面创建投票",
                    duration: 2,
                    theme: 'light',
                };
                Toast.info(opts)
            }
        }catch(error){
            Toast.error(error.message)
        }
    }

    const closeVoting = async () => {
        const response = await fetch('http://127.0.0.1:8080/api/status',{
            method:'POST',
        });
        const data = await response.json()
        if(!data.status){
            Toast.info("投票已结束，无需关闭")
            return ;
        }
        try{
            const response = await fetch('http://127.0.0.1:8080/api/close',{
                method:'POST',
            });
            const data = await response.json()
            let opts = {
                content: '关闭投票成功！当前交易哈希为:  '+data.tx,
                duration: 2,
                theme: 'light',
            };
            Toast.success(opts)
        }catch (error){
            Toast.error(error.message)
        }

    }
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchText, setSearchText] = useState('');


    //全部用户信息框
    const renderSourceItem = item => {
        return (
            <div className="components-transfer-demo-source-item" key={item.label}>
                <Checkbox
                    onChange={() => {
                        item.onChange();
                    }}
                    key={item.label}
                    checked={item.checked}
                    style={{ height: 60, alignItems: 'center' }}
                >
                    <Avatar color={item.color} size="small" >
                        {item.abbr}
                    </Avatar>
                    <div className="info">
                        <div className="name" style={{fontWeight:800}}>
                            <Highlight sourceString={item.label} searchWords={[searchText]}></Highlight>
                        </div>
                        <div className="address">
                            <Highlight sourceString={item.value} searchWords={[searchText]}></Highlight>
                        </div>
                    </div>
                </Checkbox>
                <style jsx>
                    {`
          .components-transfer-demo-selected-item {
                .semi-icon-close {
                    visibility: hidden;
                    color: var(--semi-color-tertiary);
                }
                &:hover {
                    .semi-icon-close {
                        visibility: visible;
                    }
                }
            }
                `}
                </style>
            </div>

        );
    };

    //选中用户信息框
    const renderSelectedItem = item => {
        return (
            <div className="components-transfer-demo-selected-item" key={item.label}>
                <Avatar color={item.color} size="small">
                    {item.abbr}
                </Avatar>
                <div className="info">
                    <div className="name" style={{fontWeight:800}}>{item.label}</div>
                    <div className="address">地址：{item.value}</div>
                    <div className="id">工号：{item.id}</div>
                </div>
                <IconClose onClick={item.onRemove} />
                <style jsx>
                    {
                        `
 .components-transfer-demo-selected-item,
            .components-transfer-demo-source-item {
                height: 52px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 12px;
                &:hover {
                    background-color: var(--semi-color-fill-0);
                }
                .info {
                    margin-left: 8px;
                    flex-grow: 1;
                }
                .name {
                    font-size: 14px;
                    line-height: 20px;
                }
                .address {
                    font-size: 12px;
                    line-height: 16px;
                    color: var(--semi-color-text-2);
                }
                .id {
                    font-size: 12px;
                    line-height: 16px;
                    color: var(--semi-color-text-2);
                }
            }
                  
                        `
                    }
                </style>
            </div>
        );
    };

    const customFilter = (sugInput, item) => {
        return item.value.includes(sugInput) || item.label.includes(sugInput);
    };
    const [data, setData] = useState([]);
    //从数据库中读取用户信息字段
    const getUserData = async () =>{
        try {
            const response = await fetch('http://127.0.0.1:8080/api/user',{
                method:"GET"
            });
            const users = await response.json();
            setData(users);
            Toast.info("数据库连接正常，数据载入成功")
        } catch (error) {
            Toast.error('获取数据异常:'+ error);
        }
    }

    //刷新数据
    const flashUserData =async () =>{
        setData([])
        Toast.info("信息已清空，数据正在重新载入")
        //延迟一会儿
        setTimeout(async () => {
            await getUserData(); // 确保等待 getUserData 完成
        }, 1500);
    }


    //临时测试，后续数据库写入
    // const data = [
    //     { label: '王可然', value: '0xc13fc67f57046a56252ef63ded46eb9540ef0292', abbr: '王', color: 'amber', id: '20240906', key: 1 },
    //     { label: '李木子', value: '0x34793fb8cb95f34c43502957fcdbaeb72fe00173', abbr: '李', color: 'indigo', id: '19980808', key: 2 },
    //     { label: '刘蒙资', value: '0x9f53c48348740c8978f7605a5b1117a7630f8d00', abbr: '刘', color: 'cyan', id: '20150702', key: 3 },
    //     { label: '雷磊', value: '0x165ba77af2cba78f41d1865d54279858389ef204', abbr: '雷', color: 'blue', id: '20170306', key: 4 },
    //     { label: '王莎莎', value: '0x259e9b57d926b1652fd5ee0304d0634e62a9bcc6', abbr: '王', color: 'red', id: '20070915', key: 5 },
    //     { label: '胡乎乎', value: '0x4823c6f8af6bbf880d8163fc2367e41cd7561372', abbr: '胡', color: 'violet', id: '20011216', key: 6 },
    //     { label: '唐球秋', value: '0x7cfa67e06dc2cf5ead8d75dadea55d0343f5d99a', abbr: '唐', color: 'lime', id: '20011216', key: 7 },
    // ];

    const handleTransferChange = (values, items) => {
        const selectedValues = items.map(item => item.value);
        setSelectedItems(selectedValues);
        console.log(values, items);
        console.log(selectedItems)
    };

    const concatenatedValues = selectedItems.map(value => `"${value}"`).join(',');
    console.log(concatenatedValues)

    // 复制到剪贴板的函数
    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            let opts = {
                content: "信息已复制到剪切板",
                duration: 2,

            };
           Toast.info(opts)
        } catch (err) {
            Toast.error('复制失败'+err);
        }
    };








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
                            path: '/list',
                            name: 'list',
                            icon: <IconBeaker size="small" />
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
                <div
                    style={{
                        borderRadius: '10px',
                        border: '2px solid var(--semi-color-border)',
                        height: '340px', // 设置一个固定的高度
                        padding: '35px',
                        overflow: 'auto', // 添加滚动条
                    }}
                >
                <div className="container">
                    <div style={{marginLeft:"75px"}}>
                        <div
                            style={{
                                display: 'inline-block',
                                padding: 20,
                                backgroundColor: '#cad3c3',
                                marginRight:"0px",

                            }}
                        >
                            <Card
                                style={{ maxWidth: 300 }}
                                bordered={false}
                                headerLine={true}
                                title='谁是赢家✌'

                            >
                                投票结束后，点击此按钮查看投票结果，将从链上返回一个累计获得选票数最大的地址
                                <br/>
                                <Button theme='light' type='secondary' style={{ marginRight: 8, color:"rgba(var(--semi-light-green-5), 1)"}} onClick={getWinner}>Winner</Button>
                            </Card>
                        </div>
                        <div
                            style={{
                                display: 'inline-block',
                                padding: 20,
                                backgroundColor: '#b0a4e3',
                                marginRight:"0px"
                            }}
                        >
                            <Card
                                style={{ maxWidth: 300 }}
                                bordered={false}
                                headerLine={true}
                                title='查询候选者🔍'

                            >
                                点击此按钮，将会返回一个从链上读取的候选者地址集合，有助于您判断前端界面展示的候选地址的有效性和真实性
                                <br/>
                                <Button theme='light' type='secondary' style={{ marginRight: 8 ,color:"rgba(var(--semi-purple-4), 1)"} } onClick={allCandidate} >Candidate</Button>
                            </Card>
                        </div>
                        <div
                            style={{
                                display: 'inline-block',
                                padding: 20,
                                backgroundColor: '#eeb8c3'
                            }}
                        >
                            <Card
                                style={{ maxWidth: 300 }}
                                bordered={false}
                                headerLine={true}
                                title='投票状态🍀'

                            >
                                点击此按钮查询投票是否开启，将从链上读取投票状态，若结果为TRUE则投票开启，反之关闭不可投票
                                <br/>
                                <Button theme='light' type='secondary' style={{ marginRight: 8,color:"rgba(var(--semi-pink-5), 1)" }} onClick={getVoteStatus}>Status</Button>
                            </Card>
                        </div>
                    </div>
                    <br/>
                    <Button theme='light' type='secondary'  size='large' style={{ marginLeft: 550,color:"rgba(var(--semi-orange-3), 1)" }} onClick={closeVoting}>关闭投票</Button>
                    <Divider margin='12px'>
                        <IconSort />
                    </Divider>
                    <Row style={{ alignItems: 'center', justifyContent: 'end' }}>
                        <Col span={18}>
                            <Transfer
                                style={{ width: 800 }}
                                draggable
                                dataSource={data}
                                filter={customFilter}
                                renderSelectedItem={renderSelectedItem}
                                renderSourceItem={renderSourceItem}
                                inputProps={{ placeholder: '搜索姓名或地址' }}
                                onSearch={searchText => setSearchText(searchText)}
                                onChange={handleTransferChange}
                            />
                        </Col>
                        <Col span={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <TextArea
                                maxCount={1000}
                                style={{ width: '100%', marginBottom: '10px' }}
                                value={concatenatedValues}
                                placeholder='左侧勾选用户信息，系统自动提取并串联地址信息'
                            />
                            <Row style={{ width: '100%',justifyContent: 'flex-end' ,marginRight:"10px"}}>
                                <Button style={{ marginLeft: '22px' }} onClick={() => copyToClipboard(concatenatedValues)}>复制信息</Button>
                                <Button style={{ marginLeft: '6px' }}onClick={() => flashUserData()} >刷新用户</Button>
                                <Button style={{ marginLeft: '6px' }} onClick={() => getUserData()}>加载用户</Button>
                            </Row>
                        </Col>
                    </Row>
                </div>
                </div>
            </div>
            <style jsx>
                {
                    `
            .components-transfer-demo-selected-item {
                .semi-icon-close {
                    visibility: hidden;
                    color: var(--semi-color-tertiary);
                }
                &:hover {
                    .semi-icon-close {
                        visibility: visible;
                    }
                }
            }

            .components-transfer-demo-selected-item,
            .components-transfer-demo-source-item {
                height: 52px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 12px;
                &:hover {
                    background-color: var(--semi-color-fill-0);
                }
                .info {
                    margin-left: 8px;
                    flex-grow: 1;
                }
                .name {
                    font-size: 14px;
                    line-height: 20px;
                }
                .email {
                    font-size: 12px;
                    line-height: 16px;
                    color: var(--semi-color-text-2);
                }
            }
                    `
                }
            </style>
        </Content>
    );
};

export default ListContent;
