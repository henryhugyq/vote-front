import React from "react";
import {Form, Checkbox, Button, Typography} from '@douyinfe/semi-ui';
import {IconFilpVertical} from '@douyinfe/semi-icons';
import styles from './index.module.scss';
import "@douyinfe/semi-ui/dist/css/semi.css";

const Component = () => {
    const { Text } = Typography;

    function submitForm(values) {
        // event.preventDefault(); // 阻止表单默认提交

        fetch('http://114.55.5.198:8080/login', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 401) {
                    console.error('Error: Unauthorized');
                    // 不执行跳转操作
                } else if (!response.ok) {
                    throw new Error('Network response was not ok');
                } else {
                    return response.json();
                }
            })
            .then(data => {
                console.log('成功登录：', data);
                // 登录成功后进行页面跳转
                window.location.href="../project/blockvote"

            })
            .catch(error => {
                console.error('Error:', error);
            });


    }

    return (

        <div className={styles.rootSignupLogins}>
            <title>Sign</title>
            <div className={styles.main}>
                <div className={styles.login}>
                    <div className={styles.component66}>
                        <img
                            src="../static/panda.png"
                            className={styles.logo}
                        />
                        <div className={styles.header}>
                            <p className={styles.title}>欢迎回来</p>
                            <p className={styles.text}>
                                <span className={styles.text}>登录</span>
                                <span className={styles.text1}> Block Vote </span>
                                <span className={styles.text2}>账户</span>
                            </p>
                        </div>
                    </div>
                    <div className={styles.form}>
                        <Form className={styles.inputs} onSubmit={submitForm} action="../project/blockvote">
                            <Form.Input
                                label={{ text: "用户名" }}
                                field="username"
                                placeholder="输入用户名"
                                style={{ width: "100%" }}
                                fieldStyle={{ alignSelf: "stretch", padding: 0 }}
                            />
                            <Form.Input
                                label={{ text: "密码" }}
                                field="password"
                                placeholder="输入密码"
                                style={{ width: "100%" }}
                                fieldStyle={{ alignSelf: "stretch", padding: 0 }}
                                mode="password"
                            />
                        </Form>
                        <div style={{display:"flex"}}>
                        <Checkbox type="default">记住我</Checkbox>
                        <Text link={{href:"./registerTest"}} icon={<IconFilpVertical />} underline style={{marginLeft:'230px' }}>没有账户？点此注册</Text>
                        </div>
                        <Button theme="solid" className={styles.button}  onClick={()=>window.location.href="../project/blockvote"}>
                            登录
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Component;
