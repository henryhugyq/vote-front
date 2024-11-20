import React from 'react';
import "@douyinfe/semi-ui/dist/css/semi.css";
import { Empty } from '@douyinfe/semi-ui';
import { IllustrationNoContent } from '@douyinfe/semi-illustrations';


import { IllustrationNoContentDark} from '@douyinfe/semi-illustrations';
function Register() {
//一个空状态页面
    const emptyStyle = {
        padding: 30,
    };
    return(
        <>
            <title>Register</title>
            <Empty
                image={<IllustrationNoContent style={{ width: 450, height: 450 }} />}
                darkModeImage={<IllustrationNoContentDark style={{ width: 450, height: 450 }} />}
                description={'平台内测中，暂不开放公开注册，请联系管理员申请账号，不便之处敬请谅解'}
                style={emptyStyle}
            />
            <style jsx>
                {`
                 

                `}
            </style>
        </>
    )
}

export default Register
