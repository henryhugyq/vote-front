import React from "react";
import { useState, useEffect } from 'react';

import "@douyinfe/semi-ui/dist/css/semi.css";
import { Button, Divider,Avatar,Dropdown,Toast,Popconfirm,Upload,Input,Typography} from '@douyinfe/semi-ui';
import {IconLink, IconUpload,IconEmoji,IconRadio} from '@douyinfe/semi-icons';
import Head from "next/head";

//主页面



function Home() {

    //提示框
    function handleClick() {
        Toast.info({ content: 'Your Address is ' + "0xd0197eeefd4fe0d45325718ac089f482c8c39058" });
    }
    //气泡确认框
        const onConfirm = () => {
            Toast.success('Success Sign Out!');

        };

        const onCancel = () => {
            Toast.warning('Cancel Operation!');
        };



    const [userInput, setUserInput] = useState('');

    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    const sendAddress = async () => {
        const addresses = userInput.split(',').map(address => address.trim());
        const response = await fetch('http://114.55.5.198:8080/api/transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({addresses}),
        });
        const data = await response.json();
        let opts = {
            content: 'addCandidate Successful !Your Transaction hash:  '+data.txHash ,
            duration: 2,
            theme: 'light',
        };
        Toast.success(opts);
    };
    const { Text } = Typography;

    const ownerAddress = async () => {
        let opts = {
            content: 'The Contract Owner Address is 0x6e17ead1c82329c175f7a97ff9660ed09d2cf071  ',
            duration: 2,
            theme: 'light',
        };
        Toast.info(opts);
    };
    // 假设有一个输入框和一个按钮
    const voteCandidate = async () => {
        const address = document.getElementById('addressInput').value;
        const response = await fetch('http://114.55.5.198:8080/api/vote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ address }),
        });
        const data = await response.json();
        let opts = {
            content: 'Vote Successful!Transaction hash is:  '+data.tx,
            duration: 2,
            theme: 'light',
        };
        Toast.success(opts);
    }
    const getVoteStatus = async () => {
        const response = await fetch('http://114.55.5.198:8080/api/status',{
            method:'POST',
        });
        const data = await response.json()
        Toast.info({content:"The voteStatus is "+data.status} )
    }
    const closeVoting = async () => {
        const response = await fetch('http://114.55.5.198:8080/api/close',{
            method:'POST',
        });
        const data = await response.json()
        let opts = {
            content: 'Close Successful!Transaction hash is:  '+data.tx,
            duration: 2,
            theme: 'light',
        };
        Toast.success(opts)
    }

    const getWinner = async () => {
        const response = await fetch('http://114.55.5.198:8080/api/winner',{
            method:'POST',
        });
        const data = await response.json()
        let opts = {
            content: 'The Winner Address is:  '+data.winnerAddress,
            duration: 2,
            theme: 'light',
        };
        Toast.success(opts)
    }

    const allCandidate = async () => {
        const response = await fetch('http://114.55.5.198:8080/api/all',{
            method:'POST',
        });
        const data = await response.json()
        let opts = {
            content: 'The All CandidateAddress are:  '+data.all,
            duration: 2,
            theme: 'light',
        };
        Toast.info(opts)
    }
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="../static/logo.png" />
                <title>Home</title>
            </Head>
            <div className="topnav">
                <a href="/home">Home</a>
                <a href="/test/index">MultiSig</a>
                <a href="/project">Project</a>
                <a href="/about">About</a>


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


            </div>

            <div className="container">
                <div className="row">
                        <div className="header" >
                           <h2>测试页面</h2>
                        </div>

                    <div>
                    <input type="text" value={userInput} onChange={handleInputChange} />
                    <Button onClick={sendAddress}>Confirm and Add</Button>
                    </div>
                    <div>
                        <input type="text" id="addressInput"/>
                        <Button onClick={voteCandidate} icon={<IconEmoji/>}>Vote</Button>
                    </div>
                    <div>
                        <Button icon={<IconRadio/>} onClick={getVoteStatus}>VoteStatus</Button>
                    </div>
                    <div>
                        <Button onClick={closeVoting}>CloseVoting</Button>
                    </div>
                    <div>
                        <Button onClick={getWinner}>getWinners</Button>
                    </div>
                    <div>
                        <Button onClick={allCandidate}>getAllCandidates</Button>
                    </div>
                    <div>
                        <Button onClick={ownerAddress}>ownerAddress</Button>
                    </div>

                    <div className="Text">
                    <Text link={{href:'http://114.55.5.198:5100/#/home'}} icon={<IconLink />} underline>前往浏览器查询</Text>
                    </div>


                    <p></p>

                </div>
            </div>

            <div className="footer">
                <h5>@2024.BlockVote Dapp.@FISCO BCOS@v1.0.0</h5>
            </div>

            <style jsx>
                {`
                  * {
                    box-sizing: border-box;
                  }

                  body {
                    font-family: Arial;
                    padding: 10px;
                    background: #cb6767;

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
                    background-color: #703403;
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
                    color: #e86868;
                  }

           

                  .row:after {
                    content: "";
                    display: table;
                    clear: both;
                    
                  }

                  .footer {
                    padding: 5px;
                    text-align: center;
                    background: #fafafa;
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

                



                `}
            </style>

        </>
    )
}

export default Home;

