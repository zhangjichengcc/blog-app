/*
 * @Author: zhangjicheng
 * @Date: 2021-11-10 11:26:51
 * @LastEditTime: 2021-11-10 16:18:53
 * @LastEditors: Please set LastEditors
 * @Description: 生成环境文件
 * @HowToDo: npm run bootstrap:dev/prod
 */

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

const log = console.log;

/**
 * ? process.argv[2]
 * @description: 获取命令对应参数
 */

// 当前执行环境
// const env = process.argv[2].replace(/ENV=([^\s])/, '$1') || 'dev';
const env = process.env.UMI_ENV || 'dev';

log(chalk.blue(`配置环境：${env}\n开始写入配置文件...\n`));

const defaultEnvFile = fs.readFileSync(path.join(__dirname, `../config/env/default.env`))
const currentEnvFile = fs.readFileSync(path.join(__dirname, `../config/env/${env}.env`))

/** 拼接环境配置 */
const env_content = `
# ------------------------------------------------------
# THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
# 生成生产配置：npm run bootstrap:prod
# 生成测试配置：npm run bootstrap:dev
# 参考 package.json
# 配置生成时间：${new Date()}
# 当前配置环境：environment: ${env}
# ------------------------------------------------------\n\n
${defaultEnvFile}\n
${currentEnvFile}
`

/** 写入配置 */
fs.writeFile(path.join(__dirname, '../.env'), env_content, (err) => {
  if (err) {
    log(chalk.red(`生成失败！\n${err}`));
  } else {
    log(chalk.green(`配置写入完成 .env \n\n`));
    log(chalk.green.bgBlue(env_content))
  }
})
