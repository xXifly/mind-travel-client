pipeline {
    agent {
        docker {
            image 'node:alpine' 
            args '-p 5000:5000 -v ${params.DOCKER_VOLUME}:/${params.DOCKER_VOLUME} --name mindtravel-client-prod-jenkins' 
        }
    }
    environment {
        HOME = '.'
    }
    stages {
        stage('Build') { 
            steps {
                sh 'npm install'
                sh 'npm run build' 
                
                sh 'rm -rf /${params.DOCKER_VOLUME}/*'
                sh 'cp -R ./build/* /${params.DOCKER_VOLUME}'
                
            }
        }
    }
}
