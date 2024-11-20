import React, {useEffect, useState} from 'react';
import {
    Layout,
    Button,
    Breadcrumb,
    Avatar,
    ButtonGroup,
    List,
    Typography,
    Toast,
} from '@douyinfe/semi-ui';
import {
    IconPuzzle,
} from '@douyinfe/semi-icons';
import "@douyinfe/semi-ui/dist/css/semi.css";


const VoteContent = () => {
    const { Header, Footer, Sider, Content } = Layout;
    const {Title,Paragraph,Text} = Typography;
    const [address, setAddress] = useState([]);//存储候选人地址
    const [count, setCount] = useState([]);//候选人票数
    const [candidates, setCandidates] = useState(); // 存储候选人的地址和描述
    const [winningAddress, setWinningAddress] = useState(); // 存储获胜地址
    const [isWinner,setIsWinner] = useState()
    const[users,setUsers] = useState() //存放从数据库拿出的用户信息

    // 从all获取候选人的函数
    const fetchCandidates = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8080/api/all',{
                method:'POST',
            });
            const data = await response.json()

            const response1 = await fetch('http://127.0.0.1:8080/api/user', {
                method: "GET"
            });
            const usersData = await response1.json();
            setUsers(usersData); // 保存用户数据
            setCandidates(data);
            setAddress(data.all)
        } catch (error) {
            Toast.error(error.message);
        }
    };

    //获取每个地址对应的票数
    const getVoteCount = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8080/api/count',{
                method:'POST',
            });
            const data = await response.json()
            setCount(data.count)

        } catch (error) {
            Toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchCandidates();
        getVoteCount();
    }, []);

    useEffect(() =>{
        if(count !== undefined){
            setTimeout(() => {
                getVoteWinner();
            }, 1);
        }
    },[count])




    // 根据addresses状态生成新的data数组
    // 生成新的 data 数组
    const data = address.map((address, index) => {
        // 在 users 中查找与当前地址匹配的用户
        let matchedUser = null;

        for (let user of users) {
            if (user.value === address) { // 假设用户有 address 字段
                matchedUser = user; // 找到匹配的用户
                break; // 找到后可以直接退出循环
            }
        }

        return {
            address: address,
            userId: matchedUser ? matchedUser.id : '暂无工号信息',
            name: matchedUser ? matchedUser.label : '暂无个人描述',
            avatar: matchedUser ? matchedUser.abbr : '../static/cat.jpg',
            color: matchedUser ? matchedUser.color : 'red'
        };
    });
    useEffect(() => {
        if (winningAddress) {
            address.map((item, index) => {
                if (address[index] === winningAddress){
                    setIsWinner(index)
                    console.log("比对成功",index)
                }
            });
        }
    },[]);
    const voteCandidate = async (address) => {
        try{

            const response1 = await fetch('http://127.0.0.1:8080/api/status',{
                method:'POST',
            });
            const data1 = await response1.json()
            if(!data1.status){
                Toast.error("当前投票关闭，请等待投票开启再进行操作")
                return ;
            }
            const response = await fetch('http://127.0.0.1:8080/api/vote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ address }),
            });

            const data = await response.json();
            console.log(data.status)
            let opts = {
                content: '投票成功，当前交易哈希为:  '+data.tx,
                duration: 2,
                theme: 'light',
            };
            let opts2 = {
                content: '投票失败，您仅能投一票，但错误操作仍会记录上链，当前交易哈希为:  '+data.tx,
                duration: 2,
                theme: 'light',
            };
            if(data.status === 22){
                Toast.warning(opts2)
            }else{
                Toast.success(opts);
            }
        }catch(error){
            Toast.error(error.message)
        }

    }

    const getVoteWinner = async () => {
        try {
            //先拿到当前投票状态
            const response1 = await fetch('http://127.0.0.1:8080/api/status',{
                method:'POST',
            });
            const data1 = await response1.json()
            if(data1.status || count === undefined || address === undefined){
                return ;
            }
            // 找到最大票数的索引
            const maxIndex = count.indexOf(Math.max(...count));

            // 使用索引从address数组中获取对应的地址
            const maxAddress = address[maxIndex];
            if(count[maxIndex] === undefined || maxAddress === undefined){
                return ;
            }
            if(count[maxIndex] === 0){
                Toast.warning('上一轮投票所有候选地址都是0票，没有获胜者');
            }else{
                Toast.info('上一轮投票已结束，获胜者区块链地址:'+maxAddress+"🥳共获得"+count[maxIndex]+"票");
            }

        } catch (error) {
            Toast.error(error.message);
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
                            path: '/vote',
                            name: 'vote',
                            icon: <IconPuzzle size="small" />
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
                        height: '320px', // 设置一个固定的高度
                        padding: '35px',
                        overflow: 'auto', // 添加滚动条
                    }}
                >
                    <h1 style={{ textAlign: 'center', fontSize: '2em' ,color:"rgba(var(--semi-grey-9), 1)"}}>候选地址列表</h1>
                <div className="container">
                    <div style={{ padding: 8, border: '1px solid var(--semi-color-border)', margin: 8 }}>

                        <List
                            dataSource={data}
                            renderItem={(item,index) => (
                                <List.Item
                                    header={ <Avatar color={item.color} size="large" >
                                        {item.avatar}
                                    </Avatar>}
                                    main={
                                        <div>
                                            <span style={{ color: 'var(--semi-color-text-0)', fontWeight: 700 }}>{item.name}</span>
                                            {/* 根据地址显示工号 */}
                                            <div>
                                                <span style={{ color: 'var(--semi-color-text-2)' }}>{'链上地址：'}</span>
                                                <span ><Text copyable style={{ color: 'rgba(var(--semi-lime-3), 1)' }}>{item.address}</Text></span>
                                            </div>
                                            <div>
                                                <span style={{ color: 'var(--semi-color-text-2)' }}>{'工号：'}</span>
                                                <span style={{ color: 'rgba(var(--semi-orange-3), 1)' }}>{item.userId}</span>
                                            </div>
                                        </div>
                                    }
                                    extra={
                                        <ButtonGroup theme="borderless">
                                            <Button onClick={() => voteCandidate(address[index])}>投票给TA</Button>
                                            <Button onClick={() => getVoteCount()}>当前票数:<span style={{ color: 'red' }}>{count[index]}</span></Button>
                                        </ButtonGroup>
                                    }
                                />
                            )}
                        />
                    </div>
                    <p></p>

                </div>
            </div>
            </div>
        </Content>
    );
};

export default VoteContent;
