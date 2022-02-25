/*
 * @Author: your name
 * @Date: 2021-12-17 16:21:21
 * @LastEditTime: 2022-01-20 17:17:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\components\TopUserBar\index.tsx
 */

import React, { FC, useState } from 'react';
import { Avatar, Modal, Input, message, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { oauthPwd } from '@/services/user';
import { setToken } from 'utils/authority';

import styles from './index.less';

const TopUserBar: FC<any> = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form, setForm] = useState({ name: '', pwd: '' });

  function handleOk() {
    const params = {
      name: form.name,
      password: form.pwd,
    };
    oauthPwd(params)
      .then((res) => {
        const { data, code } = res;
        if (code === 0) {
          const { token } = data;
          setToken(token);
          message.success('登录成功');
        } else {
          message.error('登录失败');
        }
      })
      .catch((err) => {
        message.error('登录失败');
        console.log(err);
      })
      .finally(() => {
        setIsModalVisible(false);
      });
  }

  function handleCancel() {
    setIsModalVisible(false);
  }

  function handleClick() {
    setIsModalVisible(true);
  }

  function onHandleChange(
    label: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const {
      target: { value },
    } = e;
    setForm({
      ...form,
      [label]: value,
    });
  }

  function onFormChange(_changedFields: any[], allFields: any[]) {
    const [{ value: name }, { value: pwd }] = allFields;
    setForm({ name, pwd });
  }

  return (
    <div className={styles.topUserBar}>
      <span onClick={handleClick}>
        <Avatar shape="square" size="small" icon={<UserOutlined />} />
      </span>
      <Modal
        title="login"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          onFieldsChange={onFormChange}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TopUserBar;
