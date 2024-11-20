//Project子页面
import React from "react";
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Avatar,Dropdown,Toast,Popconfirm,Card,Space, Button, Typography,Popover,Tag,Empty} from "@douyinfe/semi-ui";//card
import "@douyinfe/semi-ui/dist/css/semi.css";
import { IllustrationSuccess, IllustrationSuccessDark } from '@douyinfe/semi-illustrations';
function project() {
    const [provider, setProvider] = useState();
    const [account, setAccount] = useState();
    const [signer, setSigner] = useState();
    const { Meta } = Card;
    const { Text } = Typography;
    const connectOnclick = async () => {
        if (!window.ethereum) {
            return;
        }
        //这里使用的是ethers Web3Provider
        const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
        const storedAccount = localStorage.getItem('currentAccount');
        //console.log(storedAccount)
        if (storedAccount) {
            setAccount(storedAccount);
            setSigner(providerWeb3.getSigner(storedAccount));
        } else {
            const currenAccount = await providerWeb3.send("eth_requestAccounts", []);
            setAccount(currenAccount[0]);
            setSigner(providerWeb3.getSigner(currenAccount[0]));
            localStorage.setItem('currentAccount', currenAccount[0]);
        }
        //切换账号
        ethereum.on("accountsChanged", function (accountsChange) {
            setAccount(accountsChange[0]);
            setSigner(providerWeb3.getSigner(currenAccount[0]));
        })
    }

    function handleClick() {
        Toast.info({ content: 'Your Address is ' + account });
    }
    //气泡确认框
    const onConfirm = () => {
        Toast.success('Success Sign Out!');
    };
    const onCancel = () => {
        Toast.warning('Cancel Operation!');
    };

    return (
     <>
         <title>Project</title>
         <div className="topnav">
             <a href="/home">Home</a>
             <a href="/multisig">MultiSig</a>
             <a href="/project">Project</a>
             <a href="/about">About</a>

             {account ?
                 <a href="#" style={{ float: 'right' }} > <Dropdown
                     trigger={'click'}
                     position={'bottomLeft'}
                     render={
                         <Dropdown.Menu>
                             <Dropdown.Item onClick={handleClick}>Account</Dropdown.Item>
                             <Dropdown.Item><Popconfirm
                                 title="确定执行此操作吗？"
                                 content="Confirm your action"
                                 onConfirm={onConfirm}
                                 onCancel={onCancel}
                             >Sign Out</Popconfirm>
                             </Dropdown.Item>
                         </Dropdown.Menu>
                     }
                 ><Avatar
                     alt="0x..."
                     color="red"
                     //src=""
                     style={{ marginRight: '10px' }}
                     size="extra-small"
                 >0x</Avatar></Dropdown>Connected</a>
                 :
                 <a href="#" style={{ float: 'right' }} onClick={connectOnclick} >Connect Wallet</a>
             }

         </div>
<div className = "card">
         <Card
             style={{ maxWidth: 340 }}
             title={
                 <Meta
                     title="Block Vote"
                     description="支持该项目"
                     avatar={
                         <Avatar
                             alt='Card meta img'
                             size="default"
                             src='https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/card-meta-avatar-docs-demo.jpg'
                         />
                     }
                 />
             }
             headerExtraContent={
                 <Popover
                     content={
                         <Empty
                             title={'Block Vote'}
                             image={<IllustrationSuccess style={{ width: 150, height: 150 }} />}
                             darkModeImage={<IllustrationSuccessDark style={{ width: 150, height: 150 }} />}
                             description="BlockVote是一个基于区块链的多链投票平台，用户通过投票来表示对心仪项目或观点的支持"
                             style={{ width: 400, margin: '0 auto', display: 'flex', padding: 20 }}
                         />
                     }
                 >
                     <Tag style={{
                         backgroundColor: 'rgba(var(--semi-blue-4),1)',
                         color: 'var(--semi-color-white)'
                     }}>
                         More
                     </Tag>
                 </Popover>
             }
             cover={
                 <img
                     alt="example"
                     src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo.jpeg"
                 />
             }
             footerLine={ true }
             footerStyle={{ display: 'flex', justifyContent: 'flex-end' }}
             footer={
                 <Space>
                     <Button theme='borderless' type='primary'>Goeril Testnet</Button>
                     <a href="/project/blockvote"><Button theme='solid' type='primary'>点击查看</Button></a>
                 </Space>
             }
         >
            Block Vote 是一个基于区块链的多链投票平台
         </Card>

         <Card
             style={{ maxWidth: 340 }}
             title={
                 <Meta
                     title="Protect Animal"
                     description="支持该项目"
                     avatar={
                         <Avatar
                             alt='Card meta img'
                             size="default"
                             src='https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/card-meta-avatar-docs-demo.jpg'
                         />
                     }
                 />
             }
             headerExtraContent={
                 <Popover
                     content={
                         <Empty
                             title={'Protect Animal'}
                             image={<IllustrationSuccess style={{ width: 150, height: 150 }} />}
                             darkModeImage={<IllustrationSuccessDark style={{ width: 150, height: 150 }} />}
                             description="这是一个关于保护动物的主题投票，一起贡献微薄之力"
                             style={{ width: 400, margin: '0 auto', display: 'flex', padding: 20 }}
                         />
                     }
                 >
                     <Tag style={{
                         backgroundColor: 'rgba(var(--semi-blue-4),1)',
                         color: 'var(--semi-color-white)'
                     }}>
                         More
                     </Tag>
                 </Popover>
             }
             cover={
                 <img
                     alt="example"
                     src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo.jpeg"
                 />
             }
             footerLine={ true }
             footerStyle={{ display: 'flex', justifyContent: 'flex-end' }}
             footer={
                 <Space>
                     <Button theme='borderless' type='primary'>Polygon Mainnet</Button>
                     <Button theme='solid' type='primary'>点击查看</Button>
                 </Space>
             }
         >
           保护动物的相关投票
         </Card>

    <Card
        style={{ maxWidth: 340 }}
        title={
            <Meta
                title="Save the Children"
                description="支持该项目"
                avatar={
                    <Avatar
                        alt='Card meta img'
                        size="default"
                        src='https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/card-meta-avatar-docs-demo.jpg'
                    />
                }
            />
        }
        headerExtraContent={
            <Popover
                content={
                    <Empty
                        title={'Protect Animal'}
                        image={<IllustrationSuccess style={{ width: 150, height: 150 }} />}
                        darkModeImage={<IllustrationSuccessDark style={{ width: 150, height: 150 }} />}
                        description="守护儿童就是守护未来"
                        style={{ width: 400, margin: '0 auto', display: 'flex', padding: 20 }}
                    />
                }
            >
                <Tag style={{
                    backgroundColor: 'rgba(var(--semi-blue-4),1)',
                    color: 'var(--semi-color-white)'
                }}>
                    More
                </Tag>
            </Popover>
        }
        cover={
            <img
                alt="example"
                src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo.jpeg"
            />
        }
        footerLine={ true }
        footerStyle={{ display: 'flex', justifyContent: 'flex-end' }}
        footer={
            <Space>
                <Button theme='borderless' type='primary'>Ethereum Mainnet</Button>
                <Button theme='solid' type='primary'>点击查看</Button>
            </Space>
        }
    >
       帮助需要的儿童
    </Card>
    <Card
        style={{ maxWidth: 340 }}
        title={
            <Meta
                title="template"
                description="支持该项目"
                avatar={
                    <Avatar
                        alt='Card meta img'
                        size="default"
                        src='https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/card-meta-avatar-docs-demo.jpg'
                    />
                }
            />
        }
        headerExtraContent={
            <Text link>
                More
            </Text>
        }
        cover={
            <img
                alt="example"
                src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo.jpeg"
            />
        }
        footerLine={ true }
        footerStyle={{ display: 'flex', justifyContent: 'flex-end' }}
        footer={
            <Space>
                <Button theme='borderless' type='primary'>Blockchain Network</Button>
                <Button theme='solid' type='primary'>点击查看</Button>
            </Space>
        }
    >
        这是一个模板
    </Card>

</div>


         <style jsx>
             {`
                  * {
                    box-sizing: border-box;
                  }

                  body {
                    font-family: Arial;
                    padding: 10px;
                    background: #f8f3f3;
                  
                  }
                  
                  .card {
                  display: flex;
                  justify-content: space-between;
                }


                  .header {
                    padding: 30px;
                    text-align: center;
                    background: white;
                  }

                  .header h1 {
                    font-size: 50px;
                  }

                  .topnav {
                    overflow: hidden;
                    background-color: #333;
                  }

                  .topnav a {
                    float: left;
                    display: block;
                    color: #f2f2f2;
                    text-align: center;
                    padding: 14px 16px;
                    text-decoration: none;
                  }

                  .topnav a:hover {
                    background-color: #ddd;
                    color: #151515;
                  }

                  .fakeimg {
                    background-color: #eedede;
                    width: 100%;
                    padding: 20px;
                    height: 100px;

                  }

                  .card {
                    background-color: white;
                    padding: 20px;
                    margin-top: 5px;
                  }

                  .row:after {
                    content: "";
                    display: table;
                    clear: both;
                  }

                  .footer {
                    padding: 5px;
                    text-align: center;
                    background: #756a6a;
                    margin-top: 0px;
                  }

                  .button {
                    background-color: #95efbc;
                    border: none;
                    color: #070707;
                    padding: 10px 15px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    cursor: pointer;
                  }

                  input[type=text] {
                    width: 20%;
                    padding: 12px 20px;
                    margin: 8px 0;
                    box-sizing: border-box;
                  }


                `}
         </style>
     </>
    );
}
export default project;