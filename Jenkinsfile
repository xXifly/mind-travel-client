pipeline {
    agent {
        docker {
            image 'node:alpine' 
            args '-p 5000:5000' 
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
                sh 'npm install -g serve'
                sh 'nohup serve -s build'
            }
        }
    }
}
