/*
 * @Author: your name
 * @Date: 2021-11-08 16:10:07
 * @LastEditTime: 2022-02-25 18:58:45
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\pages\Register\index.tsx
 */

import React, { FC, useEffect, useState } from 'react';
import classnames from 'classnames';
import { history } from 'umi';
import { Form, Input, Button, message, Avatar, Spin } from 'antd';
import { oauthPwd } from '@/services/user';
import {
  FacebookOutlined,
  GithubOutlined,
  QqOutlined,
  LockOutlined,
  UserOutlined,
  WechatOutlined,
  WeiboOutlined,
} from '@ant-design/icons';
import logoImg from 'assets/global/logo.png';
import styles from './index.less';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const Login: FC<any> = (props): React.ReactElement => {
  const [form] = Form.useForm();
  const [spinning, setSpinning] = useState(false);

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    const { username, password } = values;
    const params = {
      name: username,
      password,
    };
    oauthPwd(params).then((res) => {
      debugger;
    });
  };

  function githubSso() {
    setSpinning(true);
    const CLIENT_ID = process.env.ClientID; // prod
    const url = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&client_secret=${process.env.ClientSecret}`;
    window.location.href = url;
  }

  useEffect(() => {
    // debugger
  }, []);

  return (
    <div className={styles.view}>
      <Spin tip="正在跳转第三方平台..." spinning={spinning}>
        <Form
          {...formItemLayout}
          name="normal_login"
          className={styles.form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!',
                    ),
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: 'Please input your phone number!' },
            ]}
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Register
            </Button>
            <span style={{ marginLeft: 8 }}>or</span>
            <span
              style={{ marginLeft: 8, color: '#1890ff' }}
              onClick={() => history.push('/register')}
            >
              login now!
            </span>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default Login;
