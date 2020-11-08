import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios';
import { Row, Col, List, Breadcrumb, Affix } from 'antd'
import ReactMarkdown from 'react-markdown'
import MarkNav from 'markdown-navbar';

//markdown
import marked from 'marked'
import hljs from "highlight.js"
import 'highlight.js/styles/monokai-sublime.css';
//import 'highlight.js/styles/github.css';

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import Tocify from '../components/tocify.tsx'

import { CalendarOutlined, FireOutlined, FolderOutlined } from '@ant-design/icons'

import 'markdown-navbar/dist/navbar.css';
import '../static/style/pages/detailed.css'

const Detailed = (list) => {

    const [mylist, setMyList] = useState(list.data);

    const tocify = new Tocify()
    const renderer = new marked.Renderer();
    renderer.heading = function (text, level, raw) {
        const anchor = tocify.add(text, level);
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    };

    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });

    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Header />
            <Row className="comm-main" type="flex" justify="center">
                <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
                    <div>
                        <List
                            header={<div>最新日志</div>}
                            itemLayout="vertical"
                            dataSource={mylist}
                            renderItem={item => (
                                <List.Item>
                                    <div className="list-title">
                                        <Link href={{ pathname: '/detailed', query: { id: item.article_id } }}>
                                            <a>{item.title}</a>
                                        </Link>
                                    </div>
                                    <div className="list-icon">
                                        <span><CalendarOutlined /> {item.create_time}</span>
                                        <span><FolderOutlined /> {item.tags.map((tag) => (tag.name)).join(' ')}</span>
                                        <span><FireOutlined /> {item.fire}</span>
                                    </div>
                                    <div className="list-context">{marked(item.text)}</div>
                                </List.Item>
                            )}
                        />
                    </div>
                </Col>

                <Col className="comm-box" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author></Author>
                    <Advert></Advert>

                    <Affix offsetTop={5}>
                        <div className="detailed-nav comm-box">
                            <div className="nav-title">文章目录</div>
                            <div className="toc-list">
                                {tocify && tocify.render()}
                            </div>

                        </div>
                    </Affix>
                </Col>
            </Row>

            <Footer></Footer>

        </>
    )
}

Detailed.getInitialProps = async (context) => {

    const promise = new Promise((resolve) => {
        let data = {
            header: {
                service: 'article',
                model: 'get',
            },
            body: {
                article_id: context.query.id
            }
        }

        axios.post('http://182.254.219.227:9080/api/v1', data).then(

            (res) => {

                resolve(res.data.result);
            }
        )
    })

    return await promise;
}

export default Detailed;