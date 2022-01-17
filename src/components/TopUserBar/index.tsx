/*
 * @Author: your name
 * @Date: 2021-12-17 16:21:21
 * @LastEditTime: 2022-01-17 18:42:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\components\TopUserBar\index.tsx
 */

import React, { FC, useState } from 'react';
import { Avatar, Modal, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { oauthPwd } from '@/services/user';

import styles from './index.less';

const TopUserBar: FC<any> = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form, setForm] = useState({ name: '', pwd: '' });

  function handleOk() {
    const params = {
      name: form.name,
      password: form.pwd,
    };
    oauthPwd(params).then((res) => {
      debugger;
    });
  }

  function handleCancel() {}

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
        <Input
          onChange={(e) => onHandleChange('name', e)}
          placeholder="user name"
          prefix={<UserOutlined />}
        />
        <Input.Password
          onChange={(e) => onHandleChange('pwd', e)}
          placeholder="input password"
        />
      </Modal>
    </div>
  );
};

export default TopUserBar;
