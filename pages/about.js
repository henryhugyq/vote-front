import React from "react";
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import {Upload,Form, Button,Nav,Avatar,Dropdown,Toast,Popconfirm,Input} from "@douyinfe/semi-ui";
import "@douyinfe/semi-ui/dist/css/semi.css";
import { IconSemiLogo, IconFeishuLogo, IconHelpCircle, IconBell } from '@douyinfe/semi-icons';
import styles from './index.module.scss';
function about() {
    const [provider, setProvider] = useState();
    const [account, setAccount] = useState();
    const [signer, setSigner] = useState();



    const connectOnclick = async () => {
        if (!window.ethereum) {
            return;
        }
        //这里使用的是ethers Web3Provider
        const providerWeb3 = new ethers.providers.Web3Provider(window.ethereum);
        const storedAccount = localStorage.getItem('currentAccount');
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
            <title>About</title>
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
            <div>
                <div className={styles.rootBio}>
                    <div className={styles.content}>
                        <div className={styles.banner}>
                        </div>
                        <div className={styles.profile}>
                            <Form className={styles.form}>
                                <div className={styles.frame1312316522}>
                                    <div className={styles.frame1312316520}>
                                        <Form.Input
                                            label={{ text: "姓名" }}
                                            field="input"
                                            placeholder="请输入内容"
                                            initValue="Alice"
                                            style={{ width: 330 }}
                                            fieldStyle={{ flexGrow: 1, flexBasis: 0, padding: 0 }}
                                        />
                                        <Form.Input
                                            label={{ text: "邮箱" }}
                                            field="field1"
                                            placeholder="请输入内容"
                                            initValue="1234@blockvote.com"
                                            style={{ width: 330 }}
                                            fieldStyle={{ flexGrow: 1, flexBasis: 0, padding: 0 }}
                                        />
                                    </div>

                                        <Form.InputGroup label={{ text: (<span>手机号码</span>), required: true }} labelPosition='top'>
                                            <Form.Select style={{ width: 150 }} field='phonePrefix' initValue='+86' rules={[{ required: true }]} showClear>
                                                <Form.Select.Option value='+1'>美国+1</Form.Select.Option>
                                                <Form.Select.Option value='+852'>香港+852</Form.Select.Option>
                                                <Form.Select.Option value='+86'>中国+86</Form.Select.Option>
                                                <Form.Select.Option value='+81'>日本+81</Form.Select.Option>
                                            </Form.Select>
                                            <Form.Input i style={{ width: 250 }} field='phoneNumber' rules={[{ required: true }]} showClear />
                                        </Form.InputGroup>
                                    <h4>钱包账号:{account}</h4>
                                </div>
                                <div className={styles.frame1312316523}>
                                    <Form.TextArea
                                        label={{ text: "简介" }}
                                        field="textare"
                                        placeholder="请输入内容"
                                        validateStatus="default"
                                        style={{ width: "100%" }}
                                        fieldStyle={{ alignSelf: "stretch", padding: 0 }}
                                    />

                                    <div className={styles.formField5frEnabled}>
                                        <div className={styles.label}>
                                            <p className={styles.portfolio}>材料</p>
                                        </div>
                                        <Upload
                                            action="https://run.mocky.io/v3/d6ac5c9e-4d39-4309-a747-7ed3b5694859"
                                            dragSubText="仅支持 png, jpeg"
                                            draggable={true}
                                            promptPosition="left"
                                            dragMainText="点击上传文件或拖拽文件到这里"
                                            className={styles.upload}
                                        />
                                        <Button htmlType='submit'>提交</Button>
                                    </div>
                                </div>
                            </Form>
                            <div className={styles.avatar}>
                                <Avatar
                                    size="extra-large"
                                    src="https://tse3-mm.cn.bing.net/th/id/OIP-C.HWhq-8Sxg-LW2kS5V-XKegAAAA?w=185&h=185&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                                    color="blue"
                                    className={styles.avatar}
                                >
                                    示例
                                </Avatar>
                                <div className={styles.frame1312316525}>
                                    <p className={styles.richardHendricks}>GG　BOND</p>
                                    <p className={styles.aRichardHendricks}>@BlockVote</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
export default about;