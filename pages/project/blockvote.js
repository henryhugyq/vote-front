import React, {useEffect, useState} from 'react';
import {
    Layout,
    Nav,
    Button,
    Avatar,
    Dropdown,
    Toast,
    Popover,
    Empty,
    Tooltip,
    Banner,
    Modal,
    Typography,
    Input, Notification, SideSheet, TabPane, Tabs, Tag

} from '@douyinfe/semi-ui';
import {
    IconHelpCircle,
    IconHome,
    IconSetting,
    IconBeaker,
    IconPuzzle,
    IconSun,
    IconMoon,
    IconShield,
    IconArrowDown, IconGift, IconLock, IconUnlock, IconGlobeStroke, IconLink, IconUserCircle, IconSemiLogo, IconBranch
} from '@douyinfe/semi-icons';
import "@douyinfe/semi-ui/dist/css/semi.css";
import Head from "next/head";
import HomeContent from "./HomeContent";
import ContractDeploy from "./SettingContent";
import ListContent from "./ListContent";
import VoteContent from "./VoteContent";
import MintContent from "./MintContent";
import {ethers} from "ethers";


function blockvote() {
    const { Header, Footer, Sider, Content } = Layout;
    const [selectedKey, setSelectedKey] = useState('Home');
    const [switchStatus,setswitchStatus] = useState(true)
    //"0x6e17ead1c82329c175f7a97ff9660ed09d2cf071"
    const [account,setAccount] = useState()

    const [account2, setAccount2] = useState("0x6e17ead1c82329c175f7a97ff9660ed09d2cf071");
    const [visible, setVisible] = useState(false);
    const [balance, setBalance] = useState();
    const [provider,setProvider] = useState();
    const {Title,Paragraph,Text} = Typography;
    const handleMenuClick = (itemKey) => {
        setSelectedKey(itemKey);
    };

    //Metamask链接
    const connectOnclick = async() => {
        if (!window.ethereum) {
            alert("Metamask not installed")
            return ;
        }
        //这里使用的是ethers BrowserProvider
        const providerWeb3 =  await new ethers.BrowserProvider(window.ethereum);
        setProvider(providerWeb3);
        //获取账户
        const currenAccount = await window.ethereum.request({method: "eth_requestAccounts",});
        setAccount(currenAccount[0]);
        window.ethereum.on("accountsChanged",function(accountsChange) {
            setAccount(accountsChange[0]);
        })
        //获取余额
        const currentBalance = await providerWeb3.getBalance(currenAccount[0]);
        setBalance(ethers.formatEther(currentBalance));
        //切换账号并获取余额
        window.ethereum.on("accountsChanged", function (accountsChange) {
            setAccount(accountsChange[0]);
            providerWeb3.getBalance(accountsChange[0]).then((result) => {
                setBalance(ethers.formatEther(result))
            });
        })
        Notification.success({
            title: 'Connected to Wallet',
            content: 'You have successfully connected to your wallet.',
            duration: 3,
            position: 'topLeft'
        });
    }

    //明暗切换
    const switchMode = () => {
        const body = document.body;
        if (body.hasAttribute('theme-mode')) {
            body.removeAttribute('theme-mode');

            setswitchStatus(true)
        } else {
            body.setAttribute('theme-mode', 'dark');
            setswitchStatus(false)
        }
    };

    const welcome = () =>{
        Notification.success({
            title: '登录成功',
            content: '你已经成功链接Fisco Bcos网络，查看右侧按钮获得帮助',
            duration: 3,
            position: 'topLeft'
        });
    }
    useEffect(() =>{
      welcome()
    },[])

    //对话框
    const showDialog = () => {
        setVisible(true);
    };
    const handleOk = () => {
        setVisible(false);
        console.log('Ok button clicked');
        Toast.info("pem私钥已导出")

        // 创建一个下载链接
        const link = document.createElement('a');
        link.href = './'; // 替换为文件路径
        link.download = '0x6e17ead1c82329c175f7a97ff9660ed09d2cf071.pem'; // 替换为文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const handleCancel = () => {
        setVisible(false);
        console.log('Cancel button clicked');
    };
    const handleAfterClose = () => {
        console.log('After Close callback executed');
    };

    const loginout = () => {

        console.log('User logged out');

        // 返回首页
        window.location.href = 'http://localhost:3000';
    };


    const change = () => {
        setVisible(!visible);
    };



    //显示账户
    const ToastAccount = async ()=>{
        let opts = {
            content: '您的Fisco Bcos区块链地址是<'+ account2 + ">",
            duration: 3,
            theme:"light"
        }
        Toast.info(opts)
    };


    return (
        <>
            <Head>
                <link rel="shortcut icon" href="../static/panda.png" />
                <title>BlockVote</title>
            </Head>
            <Layout style={{ border: '1px solid var(--semi-color-border)' }}>
                <Banner
                    type="info"
                    description="欢迎使用Blockvote区块链投票平台"
                />
                <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
                    <div>
                        <Nav mode="horizontal" defaultSelectedKeys={['Home']}>
                            <Nav.Header>
                                <img
                                    src="../static/panda.png"
                                    style={{

                                        height: "36px",
                                        width: "36px",

                                    }}

                                />
                            </Nav.Header>


                            <span
                                style={{
                                    color: 'var(--semi-color-text-2)',
                                }}
                            >
                            <span
                                style={{
                                    marginRight: '24px',
                                    color: 'lightslategrey',
                                    fontWeight: '600',
                                }}
                            >
                               BlockVote
                            </span>

                        </span>
                            <Nav.Footer>
                                <Button onClick={change}>帮助文档</Button>
                                <SideSheet title="介绍与帮助" visible={visible} onCancel={change}>
                                    <div>
                                        <Tabs type="line">
                                            <TabPane tab="文档" itemKey="1">
                                                <h3>简介</h3>
                                                <p style={{ lineHeight: 1.8 }}>
                                                    随着国家政策支持和技术发展，区块链技术在电子投票系统中得到广泛应用。区块链的去中心化、不可篡改和透明性，为投票过程提供了安全性、公正性和效率的保障。
                                                    与传统投票系统相比，基于区块链的电子投票系统具有以下优势：安全性：区块链的分布式账本特性确保了投票信息的不可篡改性，防止任何个人或组织对投票结果进行恶意操作。公正性：基于智能合约的自动化选举流程，消除了人为干预的可能，确保了投票过程的公正性。效率：区块链技术的分布式处理能力，可以提高投票效率，缩短选举周期。
                                                </p>
                                                <p style={{ lineHeight: 1.8 }}>
                                                    区别于其他的系统而言，BlockVote结合多种前沿区块链开发设计，具有以下优势：
                                                </p>
                                                <ul>
                                                    <li>
                                                        <p>链端基于Fisco Bcos联盟链架构设计开发</p>
                                                    </li>
                                                    <li>
                                                        <p>使用next.js + semi-ui + gin构建前后端</p>
                                                    </li>
                                                    <li>
                                                        <p>引入Chainlink VRF，预言机拓展区块链</p>
                                                    </li>
                                                    <li>
                                                        <p>立足设计初衷，兼顾技术与人文关怀</p>
                                                    </li>
                                                </ul>
                                            </TabPane>
                                            <TabPane tab="快速起步" itemKey="2">
                                                <h3>安装依赖</h3>
                                                <pre
                                                    style={{
                                                        margin: '24px 0',
                                                        padding: '20px',
                                                        border: 'none',
                                                        whiteSpace: 'normal',
                                                        borderRadius: 'var(--semi-border-radius-medium)',
                                                        color: 'var(--semi-color-text-1)',
                                                        backgroundColor: 'var(--semi-color-fill-0)',
                                                    }}
                                                >
                    <code>npm install</code>
                </pre>

                                                <h3>启动前端项目</h3>
                                                <pre
                                                    style={{
                                                        margin: '24px 0',
                                                        padding: '20px',
                                                        border: 'none',
                                                        whiteSpace: 'normal',
                                                        borderRadius: 'var(--semi-border-radius-medium)',
                                                        color: 'var(--semi-color-text-1)',
                                                        backgroundColor: 'var(--semi-color-fill-0)',
                                                    }}
                                                >
                    <code>npm run dev</code>
                </pre>
                                                <h3>启动所有节点</h3>
                                                <pre
                                                    style={{
                                                        margin: '24px 0',
                                                        padding: '20px',
                                                        border: 'none',
                                                        whiteSpace: 'normal',
                                                        borderRadius: 'var(--semi-border-radius-medium)',
                                                        color: 'var(--semi-color-text-1)',
                                                        backgroundColor: 'var(--semi-color-fill-0)',
                                                    }}
                                                >
                    <code>bash nodes/127.0.0.1/start_all.sh</code>
                </pre>

                                                <h3>WeBase服务管理</h3>
                                                <pre
                                                    style={{
                                                        margin: '24px 0',
                                                        padding: '20px',
                                                        border: 'none',
                                                        whiteSpace: 'normal',
                                                        borderRadius: 'var(--semi-border-radius-medium)',
                                                        color: 'var(--semi-color-text-1)',
                                                        backgroundColor: 'var(--semi-color-fill-0)',
                                                    }}
                                                >
                    <code>启动： bash start.sh</code>
                    <br/>
                    <code>暂停： bash stop.sh</code>
                    <br/>
                    <code>状态： bash status.sh</code>
                </pre>
                                                <h3>浏览器管理</h3>
                                                <pre
                                                    style={{
                                                        margin: '24px 0',
                                                        padding: '20px',
                                                        border: 'none',
                                                        whiteSpace: 'normal',
                                                        borderRadius: 'var(--semi-border-radius-medium)',
                                                        color: 'var(--semi-color-text-1)',
                                                        backgroundColor: 'var(--semi-color-fill-0)',
                                                    }}
                                                >
                    <code>部署： python3 deploy.py installAll</code>
                    <br/>
                    <code>暂停： python3 deploy.py stopAll</code>
                    <br/>
                    <code>启动： python3 deploy.py startAll</code>
                                                </pre>

                                            </TabPane>
                                            <TabPane tab="帮助" itemKey="3">
                                                <h3>帮助</h3>
                                                <p style={{ lineHeight: 1.8, color: 'var(--semi-color-text-0)', fontWeight: 600 }}>
                                                    Q：为什么选取Fisco Bcos作为底层区块链架构？
                                                </p>
                                                <p style={{ lineHeight: 1.8, color: 'var(--semi-color-text-1)' }}>
                                                   因为联盟链满足用户的隐私场景，且具有较高的TPS。
                                                </p>
                                                <p style={{ lineHeight: 1.8, color: 'var(--semi-color-text-0)', fontWeight: 600 }}>
                                                    Q：为什么要在传统的NFT铸造中引入VRF？
                                                </p>
                                                <p style={{ lineHeight: 1.8, color: 'var(--semi-color-text-1)' }}>
                                                    传统的链上随机数一般是基于区块hash，时间戳，区块难度等等参数计算得到种子，但当获利成本大于篡改成本时，矿工可以有选择的挑选交易打包，来达到自己想要的结果，因此会存在MEV问题，所以链上随机数具有被篡改的可能。
                                                    跟单纯链下生成随机数不同的是，Chainlink VRF 生成的随机数可以通过 Proof 证明它是根据特定椭圆曲线算法算出来的，具有可验证性、独特性。
                                                </p>
                                            </TabPane>
                                        </Tabs>
                                    </div>
                                </SideSheet>
                                {switchStatus ?
                                    <Tooltip
                                        position='bottom'
                                        content='切换到黑夜模式'>
                                        <Button
                                            theme="borderless"
                                            onClick={switchMode}
                                            icon={<IconSun />}
                                            style={{
                                                color: 'rgba(var(--semi-orange-4), 1)',
                                                marginRight: '12px',
                                            }}
                                        />
                                    </Tooltip>:
                                    <Tooltip
                                        position='bottom'
                                        content='切换到白天模式'>
                                        <Button
                                            theme="borderless"
                                            onClick={switchMode}
                                            icon={<IconMoon />}
                                            style={{
                                                color: 'rgba(var(--semi-yellow-4), 1)',
                                                marginRight: '12px',
                                            }}
                                        />
                                    </Tooltip>
                                }
                                <Popover
                                    content={
                                        <Empty
                                            title={'BlockVote Tips'}
                                            description="1.基于Fisco Bcos联盟链网络|
                                    2.点击头像查看账户信息|3.请妥善保管您的公私密钥对"
                                            style={{ width: 400, margin: '0 auto', display: 'flex', padding: 20 }}
                                        />
                                    }
                                >
                                    <Button
                                        theme="borderless"
                                        icon={<IconHelpCircle size="large" />}
                                        style={{
                                            color: 'rgba(var(--semi-indigo-1), 1)',
                                            marginRight: '12px',
                                        }}
                                    />

                                </Popover>
                                <Dropdown
                                    render={
                                        <Dropdown.Menu>
                                            <Dropdown.Item  style={{color:"rgba(var(--semi-blue-5), 1)"}} ><Text link={{href:'http://114.55.5.198:5100/#/home'}} icon={<IconLink />} underline>WeBase控制台</Text></Dropdown.Item>
                                            <Dropdown.Item  style={{color:"rgba(var(--semi-blue-5), 1)"}} ><Text link={{href:'http://114.55.5.198:5100/#/home'}} icon={<IconLink />} underline>Fisco浏览器</Text></Dropdown.Item>
                                            <Dropdown.Item  style={{color:"rgba(var(--semi-blue-5), 1)"}} ><Text link={{href:'http://114.55.5.198:5100/#/home'}} icon={<IconLink />} underline>Sepolia浏览器</Text></Dropdown.Item>
                                            <Dropdown.Item  style={{color:"rgba(var(--semi-blue-5), 1)"}} ><Text link={{href:'http://114.55.5.198:5100/#/home'}} icon={<IconLink />} underline>VRF控制台</Text></Dropdown.Item>
                                            <Dropdown.Item  style={{color:"rgba(var(--semi-blue-5), 1)"}} ><Text link={{href:'http://114.55.5.198:5100/#/home'}} icon={<IconLink />} underline>NFT浏览器</Text></Dropdown.Item>
                                        </Dropdown.Menu>
                                    }

                                >
                                    <Button
                                        href="#"
                                        theme="borderless"
                                        style={{
                                            color: 'rgba(var(--semi-indigo-3), 1)',
                                            marginRight: '12px',}}
                                        icon={<IconGlobeStroke  size="large"/>}

                                    />
                                </Dropdown>
                                {account ?
                                    <>
                                        <Button
                                            href="#"
                                            theme="borderless"
                                            style={{  color: 'rgba(var(--semi-cyan-1), 1)', marginRight: '12px',}}
                                            icon={<IconLock size="large"/>}
                                        />

                                    </>
                                    :
                                    <Tooltip
                                        position='bottom'
                                        content='点此按钮连接钱包'>
                                        <Button
                                            href="#"
                                            theme="borderless"
                                            style={{
                                                color: 'rgba(var(--semi-cyan-1), 1)',
                                                marginRight: '12px',}}
                                            onClick={connectOnclick}
                                            icon={<IconUnlock size="large"/>}

                                        />
                                    </Tooltip>

                                }

                                <Dropdown
                                    render={
                                        <Dropdown.Menu>
                                            <Dropdown.Item icon={<IconUserCircle />} style={{color:"rgba(var(--semi-teal-8), 1)"}} onClick={ToastAccount}>区块链地址</Dropdown.Item>
                                            <Dropdown.Item  icon={<IconShield />}style={{color:"rgba(var(--semi-yellow-6), 1)"}} onClick={showDialog}>查看私钥</Dropdown.Item>
                                            <Modal
                                                title="解锁私钥"
                                                visible={visible}
                                                onOk={handleOk}
                                                afterClose={handleAfterClose} //>=1.16.0
                                                onCancel={handleCancel}
                                                closeOnEsc={true}
                                            >
                                                请输入二级密码以解锁私钥，并谨慎保管
                                                <br />
                                                <Input mode="password" defaultValue="123456"></Input>

                                            </Modal>
                                            <Dropdown.Item  icon={<IconArrowDown />}style={{color:"rgba(var(--semi-blue-3), 1)"}} onClick={loginout}>退出登录</Dropdown.Item>
                                        </Dropdown.Menu>
                                    }
                                >
                                    <Avatar
                                        alt="beautiful cat"
                                        src="../static/cat.jpg"
                                        style={{ margin: 4 }}
                                    />
                                </Dropdown>


                            </Nav.Footer>
                        </Nav>
                    </div>
                </Header>
                <Layout>
                    <Sider style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
                        <Nav
                            style={{ maxWidth: 220, height: '100%' }}
                            defaultSelectedKeys={['Home']}
                            items={[
                                { itemKey: 'Home', text: '首页', icon: <IconHome size="large" />,onClick: () => handleMenuClick('Home')},
                                { itemKey: 'Setting', text: '创建投票', icon: <IconSetting size="large" />, onClick: () => handleMenuClick('Setting')},
                                { itemKey: 'Vote', text: '开始投票', icon: <IconPuzzle size="large" /> ,onClick: () => handleMenuClick('Vote')},
                                { itemKey: 'List', text: '信息看板', icon: <IconBeaker size="large" /> ,onClick: () => handleMenuClick('List')},
                                { itemKey: 'Mint', text: '铸造凭证', icon: <IconGift size="large" /> ,onClick: () => handleMenuClick('Mint')},

                            ]}

                            footer={{
                                collapseButton: true,
                            }}
                        />
                    </Sider>
                    {/* 这里根据 selectedKey 的值来渲染不同的页面内容 */}
                    {selectedKey === 'Home' && <HomeContent />}
                    {selectedKey === 'Vote' && <VoteContent />}
                    {selectedKey === 'List' && <ListContent />}
                    {selectedKey === 'Mint' && <MintContent />}
                    {selectedKey === 'Setting' && <ContractDeploy />}

                </Layout>
                <Footer
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '20px',
                        color: 'var(--semi-color-text-2)',
                        backgroundColor: 'rgba(var(--semi-grey-0), 1)',
                    }}
                >
                <span
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <span>Copyright © 2024 BlockVote @FISCO BCOS v-2.9 </span>
                     <Tag color='amber' size='large' shape='circle' prefixIcon={<IconBranch />}>dev-2.0</Tag>

                </span>

                </Footer>
            </Layout>


        </>
    );
}

export default blockvote
