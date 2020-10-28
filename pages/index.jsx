import React from 'react';
import Head from 'next/head'
import {Button} from 'antd';

export default function Home() {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>

      <div>
        <Button>antd click</Button>
      </div>
    </>
  )
}
