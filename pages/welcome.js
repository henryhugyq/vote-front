import { useEffect, useState } from 'react';
//测试页面，暂无用法
export default function Welcome() {
    const [welcomeText, setWelcomeText] = useState('');

    useEffect(() => {
        const text = "欢迎切换页面";
        const delay = 100; // 每个字之间的延迟时间

        let currentIndex = 0;
        const interval = setInterval(() => {
            setWelcomeText(prevText => prevText + text[currentIndex]);
            currentIndex++;

            if (currentIndex === text.length) {
                clearInterval(interval);
            }
        }, delay);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div>
            <h1>{welcomeText}</h1>
        </div>
    );
}
