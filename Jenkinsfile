import groovy.transform.Field

@Field
String DOCKER_USER_REF = 'b51bb93e-844f-409a-be1e-3ab7748c2e8b'
@Field
String SSH_ID_REF = 'myKeyGIt'

pipeline {
    agent any

    stages {
        stage('build') {
            steps {
                script {
                    // Kiểm tra phiên bản Docker
                    sh 'docker --version'
                    // Xây dựng Docker image
                    sh 'docker build -t hoangdat1612/mypbl4 .'
                }
            }
        }
        stage('deploy') {
            steps {
                // Dừng và xóa container cũ nếu nó đang chạy
                sh '''
                if [ "$(docker ps -q -f name=PLB4)" ]; then
                    docker stop PLB4
                fi
                if [ "$(docker ps -a -q -f name=PLB4)" ]; then
                    docker rm PLB4
                fi
                '''
                // Chạy Docker container
                sh 'docker run --detach --name PLB4 -p 1444:1444 hoangdat1612/mypbl4'
            }
        }
    }
}
