/*
 * @Author: zhangjicheng
 * @Date: 2022-02-24 18:12:49
 * @LastEditors: zhangjicheng
 * @LastEditTime: 2022-02-25 18:35:01
 * @FilePath: \blog-app\src\pages\Login\Redirect\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by zhangjicheng, All Rights Reserved.
 */
import React, { FC, useEffect, useState } from 'react';
import { oauthGithub } from '@/services/user';
import { history } from 'umi';
import styles from './index.less';

export default function IndexPage(props: any) {
  const { location } = props;
  const { query } = location;

  const [userinfo, setUserInfo] = useState<any>({});
  const [loading, setLoading] = useState(false);

  function authLogin() {
    const code = query.code;
    // history.replace('/');
    setLoading(true);
    oauthGithub({ code })
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res.code === 0) {
          const { data } = res;
          setUserInfo(data);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }

  useEffect(() => {
    if (query.code) {
      authLogin();
    }
  });

  return (
    <div>
      {loading ? (
        <p>三方登录跳转</p>
      ) : (
        <>
          {userinfo.username ? (
            <>
              <img src={userinfo.avatar} />
              <p>
                name: <span>{userinfo.username}</span>
              </p>
              <p>
                email: <span>{userinfo.email}</span>
              </p>
              <p>
                token:{' '}
                <span
                  style={{
                    display: 'inline-block',
                    width: '400px',
                    wordBreak: 'break-all',
                  }}
                >
                  {userinfo.token}
                </span>
              </p>
            </>
          ) : (
            <>
              <h1 className={styles.title}>Page index</h1>
            </>
          )}
        </>
      )}
    </div>
  );
}
