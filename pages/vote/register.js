import React from 'react';
import "@douyinfe/semi-ui/dist/css/semi.css";

function Register() {
//暂时停用
    return(
        <>
            <title>Register</title>
            <h1>注册</h1>

            <form action="sign">
                <label htmlFor="username">用户名</label>
                <input type="text" id="username" name="username" />

                    <label htmlFor="password">密码</label>
                    <input type="password" id="password" name="password" />

                        <label htmlFor="confirm-password">确认密码</label>
                        <input type="password" id="confirm-password" name="confirm-password" />

                            <button type="submit">注册</button>
            </form>

            <h5>@2024.BlockVote Dapp.@FISCO BCOS@v1.0.0</h5>

            <style jsx>
                {`
                  *
                  body {
                    background-color: #f8f0f0;
                    font-family: Arial, sans-serif;
                    text-align: center;
                    margin-top: 20%;

                  }

                  h1 {
                    color: #333;
                    font-size: 48px;
                    margin-bottom: 50px;
                    right: 100px;
                    left: 100px;
                    text-align: center;
                  }

                  form {
                    display: inline-block;
                    text-align: left;
                    border-radius: 10px;
                    padding: 20px;
                    background-color: #ece7b2;
                    box-shadow: 0px 0px 10px rgba(225, 157, 157, 0.3);
                    margin: 0 auto;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                  }

                  label {
                    display: block;
                    margin-bottom: 10px;
                    font-size: 24px;
                    color: #333;

                  }

                  input[type=text], input[type=password] {
                    width: 100%;
                    padding: 12px 20px;
                    margin: 8px 0;
                    display: inline-block;
                    border-radius: 4px;
                    box-sizing: border-box;
                  }

                  button {
                    background-color: #ecd889; /* Green */
                    border: none;
                    color: #f89292;
                    padding: 20px 40px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 24px;
                    margin-top: 50px;
                    cursor: pointer;
                    border-radius: 10px;

                  }
                  h5{
                    position: fixed;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    text-align: center;
                    width: 100%;
                    background-color: #f8f8f8;
                    padding: 10px 0;
                  }
                  

                  button:hover {
                    background-color: #e1c2af; /* Dark green */
                  }


                `}
            </style>
        </>
    )
}

export default Register
