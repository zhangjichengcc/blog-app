/*
 * @Author: your name
 * @Date: 2021-11-08 15:30:44
 * @LastEditTime: 2021-11-10 18:01:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\pages\index.tsx
 */
import React, {FC, useEffect, useState} from 'react';
import { oauthGithub } from '@/services/user';
import { history } from 'umi';
import styles from './index.less';

export default function IndexPage(props: any) {

  const { location } = props;
  const { query } = location;

  const [userinfo, setUserInfo] = useState<any>({});
  const [loading, setLoading] = useState(false);

  function login() {
    const CLIENT_ID = process.env.ClientID; // prod
    const url = "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID + `&client_secret=${process.env.ClientSecret}`;
    window.location.href = url;
  }

  function authLogin() {
    const code = query.code;
    history.replace('/');
    setLoading(true);
    oauthGithub({code}).then(res => {
      setLoading(false);
      console.log(res);
      if (res.code === 0) {
        const { data } = res;
        setUserInfo(data);
      }
    }).catch(err => {
      setLoading(false)
      console.log(err);
    })
  }

  useEffect(() => {
    if (query.code) {
      authLogin();
    }
  })

  return (
    <div>
      { 
        loading ?
        <p>loading</p> :
        <>
          { userinfo.username ? 
            <>
              <img src={userinfo.avatar} />
              <p>name: <span>{userinfo.username}</span></p>
              <p>email: <span>{userinfo.email}</span></p>
              <p>token: <span style={{display: 'inline-block', width: '400px', wordBreak: 'break-all'}}>{userinfo.token}</span></p>
            </> :
            <>
              <h1 className={styles.title}>Page index</h1>
              <button onClick={login}>Log in by github</button>
            </>
          }
        </>
      }
    </div>
  );
}
