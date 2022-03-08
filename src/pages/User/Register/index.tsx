/*
 * @Author: zhangjicheng
 * @Date: 2021-11-08 16:10:07
 * @LastEditTime: 2022-03-08 22:58:16
 * @LastEditors: zhangjicheng
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\pages\User\Register\index.tsx
 */

import React, { FC, useEffect, useState } from 'react';
import { history } from 'umi';
import { Form, Input, Button, message, Avatar, Spin, Upload } from 'antd';
import AvatarUpload from '@/components/AvatarUpload';
import { register, findUser } from '@/services/user';
import { debounce } from '@utils';

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

  function validUserName(_rules: any, value: string, cb: Function) {
    // setFormValidState({...formValidState, name: 'validating'});
    findUser(value)
      ?.then((res) => {
        const { data } = res;
        if (data) {
          cb(new Error('User already exists'));
        } else {
          cb();
        }
      })
      .catch((err) => {
        cb(new Error('User name check failed'));
      });
  }

  const debounceValidName = debounce(validUserName);

  console.log(debounceValidName);

  const onFinish = (values: any) => {
    const {
      name = '',
      password = '',
      avatar = '',
      email = '',
      phone = '',
    } = values;
    const params = {
      name,
      password,
      avatar,
      email,
      phone,
    };
    register(params)
      .then((res) => {
        message.success('Registration complete！');
        history.replace('/user/login');
      })
      .catch((err) => {
        const { message: msg } = err;
        message.error(msg);
      });
  };

  useEffect(() => {
    // debugger
  }, []);

  return (
    <div className={styles.view}>
      <Spin tip="Verification..." spinning={spinning}>
        <div className={styles.form}>
          <p className={styles.formHeader}>Registration information</p>
          <Form
            {...formItemLayout}
            form={form}
            name="normal_register"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              label="Username"
              hasFeedback
              rules={[
                { required: true, message: 'Please input your Username!' },
                {
                  validator: debounceValidName,
                },
              ]}
            >
              <Input placeholder="username" />
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
              <Input.Password placeholder="password" />
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
              <Input.Password placeholder="password" />
            </Form.Item>
            <Form.Item name="avatar" label="avatar">
              <AvatarUpload />
            </Form.Item>
            <Form.Item name="phone" label="Phone Number">
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
                style={{ marginLeft: 8, color: '#1890ff', cursor: 'pointer' }}
                onClick={() => history.replace('/user/login')}
              >
                login now!
              </span>
            </Form.Item>
          </Form>
        </div>
      </Spin>
    </div>
  );
};

export default Login;
