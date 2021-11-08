/*
 * @Author: your name
 * @Date: 2021-11-08 15:30:44
 * @LastEditTime: 2021-11-08 16:45:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \blog-app\src\pages\index.tsx
 */
import styles from './index.less';

export default function IndexPage() {

  function login() {
    const CLIENT_ID = "Iv1.d0c59d733fa5727d";
    const REDIRECT_URL = "http://localhost:8800/user/oauth_github";
    const url = "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID + `&client_secret=${REDIRECT_URL}`;
    window.location.href = url;
  }

  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <button onClick={login}>Log in by github</button>
    </div>
  );
}
