pipeline {
    agent {
        docker {
            image 'node:alpine' 
            args '-p 5000:5000 -v mindtravel-client-prod-build:/mindtravel-client-prod-build --name mindtravel-client-prod-jenkins' 
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
                
                sh 'rm -rf /mindtravel-client-prod-build'
                sh 'cp -R ./build/* /mindtravel-client-prod-build'
                
            }
        }
    }
}
