pipeline {
    agent any  // 在任何可用节点上运行

    environment {
        // 项目名称
        PROJECT_NAME   = "blog5-frontend"
        // Git 仓库地址（使用 SSH URL）
        GIT_REPOSITORY = "git@github.com:zhangjichengcc/blog5.0_front-end.git"
        // 目标服务器 SSH 登录信息
        DEPLOY_SERVER  = "root@118.190.52.53"
        // 目标服务器的部署路径
        DEPLOY_PATH    = "/opt/service-container/webServer/Blog5_frontEnd"
        // 目标文件
        TARGET_DIR     = "dist"
        // Jenkins 服务器的私钥路径
        SSH_KEY_PATH   = "/var/jenkins_home/.ssh/id_rsa"
    }
    
    tools {
        nodejs 'NodeJS 20+'  // 这里的 'Node20' 是全局工具配置中设置的名称
    }

    stages {
        stage('pull code') {
            steps {
                script {
                    echo "拉取代码（main 分支）"
                    checkout([$class: 'GitSCM',
                        branches: [[name: '*/main']],   // 指定 main 分支
                        userRemoteConfigs: [[
                            url: "${GIT_REPOSITORY}",
                            credentialsId: 'git' // 使用 GitHub PAT
                        ]]
                    ])
                }
            }
        }

        stage('install dependencies and build') {
            steps {
                script {
                    echo "安装依赖并打包"
                    sh """
                    npm config set registry https://registry.npmmirror.com
                    npm install pnpm -g
                    pnpm install
                    npm run build
                    """
                }
            }
        }

        stage('backup') {
            steps {
                script {
                    echo "备份原有代码"
                    sh """
                    # 登录目标服务器并备份原代码
                    ssh -i ${SSH_KEY_PATH} ${DEPLOY_SERVER} "
                    echo "备份旧代码"
                    if [ -d ${DEPLOY_PATH}/${TARGET_DIR} ]; then
                        echo "当前文件：${DEPLOY_PATH}/${TARGET_DIR}"
                        tar -zcvf ${DEPLOY_PATH}/${TARGET_DIR}_\$(date "+%Y%m%d_%H%M%S").tar.gz ${DEPLOY_PATH}/${TARGET_DIR} --remove-files
                    else
                        echo "${DEPLOY_PATH}/${TARGET_DIR} 不存在"
                    fi
                    "
                    """
                }
            }
        }

        stage('upload') {
            steps {
                script {
                    echo "上传新代码到目标服务器"
                    sh """
                    # 使用scp上传 dist 目录、.env package.json pm2.config.js文件
                    scp -i ${SSH_KEY_PATH} -r ./dist ${DEPLOY_SERVER}:${DEPLOY_PATH}/
                    """
                }
            }
        }
    }

    post {
        success {
            echo "部署成功！"
        }
        failure {
            echo "部署失败，请检查错误！"
        }
    }
}
