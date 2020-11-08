import { Avatar, Divider } from 'antd'
import { GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons'
import '../static/style/components/author.css'

const Author = () => {

    return (
        <div className="author-div comm-box">
            <div> <Avatar size={100} src="" /></div>
            <div className="author-introduction">
                自我介绍...未完待续...
                <Divider>社交账号</Divider>
                <Avatar size={28} className="account" >
                    <a href="https://github.com/sylar1015" target="_blank" title="https://github.com/sylar1015">
                        <GithubOutlined />
                    </a>
                </Avatar>
                <Avatar size={28} className="account" >
                    <QqOutlined />
                </Avatar>
                <Avatar size={28} className="account" >
                    <WechatOutlined />
                </Avatar>

            </div>
        </div>
    )

}

export default Author