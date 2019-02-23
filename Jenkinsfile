pipeline {
    agent {
        docker {
            image 'node:alpine' 
            args '-p 3000:3000' 
        }
    }
    environment {
        HOME = '.'
    }
    stages {
        stage('Build') { 
            steps {
                sh 'cat ./package.json'
                sh 'ls -al'
                sh 'pwd'
                sh 'whoami'
                sh 'npm install'
                sh 'npm run build' 
            }
        }
    }
}
