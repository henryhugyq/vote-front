import React, {useState} from 'react';
import "@douyinfe/semi-ui/dist/css/semi.css";
import {Empty, SideSheet, TabPane, Tabs} from '@douyinfe/semi-ui';
function Docs({visible, onClose}) {



    return(
        <>
            <SideSheet title="介绍与帮助" visible={visible} onCancel={onClose}>
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

            <style jsx>
                {`
                 

                `}
            </style>
        </>
    )
}

export default Docs
