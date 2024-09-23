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
                    sh 'docker-compose up --build -d'
                }
            }
        }
        stage('deploy') {
            steps {
                sh 'docker-compose down'
            }
        }
    }
}
